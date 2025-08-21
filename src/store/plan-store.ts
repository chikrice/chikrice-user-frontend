import { isToday } from 'date-fns';
import { StateCreator } from 'zustand';
import { RoadmapType } from 'chikrice-types';

import { api, endpoints } from 'src/utils/axios';

import type { CreateRoadmapInputs, PlanActions, PlanState, Store } from 'src/types';

export const createPlanStore: StateCreator<Store, [], [], PlanState & PlanActions> = (set, get) => ({
  roadmap: null,
  plans: [],
  todayPlan: null,
  totalDays: 30,
  roadmapLoading: false,
  roadmapError: null,

  // =====================================
  // CREATE THE USER ROADMAP ON REGISTER
  // =====================================
  createUserJourney: async (createRoadmapInputs: CreateRoadmapInputs) => {
    try {
      set({ roadmapLoading: true });
      const roadmap = await get().createRoadmap(createRoadmapInputs);
      const plans = await get().createPlans(roadmap, 1);
      get().setTodayPlan(plans);
    } catch (error) {
      set({ roadmapError: error.message || 'Failed to create user journey' });
    } finally {
      set({ roadmapLoading: false });
    }
  },

  // =====================================
  // INITIALIZE USER DATA
  // =====================================
  loadUserJourney: async (roadmapId: string) => {
    try {
      set({ roadmapLoading: true });
      const roadmap = await get().getRoadmap(roadmapId);
      const { milestones, onGoingMonth } = roadmap;
      const milestone = milestones[onGoingMonth - 1];
      const { id: milestoneId, plans } = milestone;

      if (!plans) {
        const plans = await get().createPlans(roadmap, onGoingMonth);
        get().setTodayPlan(plans);
      } else {
        const plans = await get().getPlans({ roadmapId, milestoneId });
        get().setTodayPlan(plans);
      }
    } catch (error) {
      set({ roadmapError: error.message || 'Failed to load user journey' });
    } finally {
      set({ roadmapLoading: false });
    }
  },

  // =====================================
  // CREATES NEW ROADMAP
  // =====================================
  createRoadmap: async (createRoadmapInputs) => {
    try {
      const { data: roadmap } = await api.post(endpoints.roadmap.create, createRoadmapInputs);
      set({ roadmap, roadmapError: null });
      return roadmap;
    } catch (error) {
      console.log(error);
      set({ roadmapError: error.message || 'Failed to initialize roadmap' });
    }
  },

  // =====================================
  // CREATE PLANS FOR ROADMAP MILESTONES
  // =====================================
  createPlans: async (roadmap, month) => {
    try {
      const data = get().transformRoadmapToPlanData(roadmap, month);
      const { data: plans } = await api.post(endpoints.plans.root, data);

      set({ plans, totalDays: plans.length, roadmapError: null });
      return plans;
    } catch (error) {
      set({ roadmapError: error.message || 'Failed to create plan_month' });
    }
  },

  // =====================================
  // GET THE ROADMAP
  // =====================================
  getRoadmap: async (roadmapId) => {
    try {
      const { data: roadmap } = await api.get(endpoints.roadmap.root(roadmapId));
      set({ roadmap });

      return roadmap;
    } catch (error) {
      set({ roadmapError: error.message || 'Failed to get roadmap' });
    }
  },

  // =====================================
  // GET ROADMAP MILESTONE PLANS
  // =====================================
  getPlans: async (params) => {
    try {
      const { data: plans } = await api.get(endpoints.plans.root, { params });
      set({ plans, totalDays: plans.length });
      return plans;
    } catch (error) {
      set({ roadmapError: error.message || 'Failed to get plan_month' });
    }
  },

  // =====================================
  // GET THE DASHBOARD TODAY PLAN
  // =====================================
  setTodayPlan: (plans) => {
    try {
      const todayPlan = plans.find((plan) => {
        const planDate = new Date(plan.date);
        return isToday(planDate);
      });

      if (todayPlan) {
        set({ todayPlan, roadmapError: null });
      } else {
        set({ todayPlan: null, roadmapError: 'No plan found for today' });
      }
    } catch (error) {
      set({ roadmapError: error.message || 'Failed to get today plan' });
    }
  },

  // =====================================
  // HELPER FUNCTIONS
  // =====================================
  transformRoadmapToPlanData: (roadmap: RoadmapType, month: number) => {
    const { id: roadmapId, milestones } = roadmap;
    const { id: milestoneId, startDate, endDate, macrosRatio, targetCalories } = milestones[month - 1];

    return {
      roadmapId,
      milestoneId,
      startDate,
      endDate,
      macrosRatio,
      targetCalories,
    };
  },
});
