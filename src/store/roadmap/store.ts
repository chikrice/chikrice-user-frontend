import { StateCreator } from 'zustand';
import { PlanType, RoadmapType } from 'chikrice-types';

import { api, endpoints } from 'src/utils/axios';

import type { CreateRoadmapInputs, RoadmapActions, RoadmapState, Store } from 'src/types';

export const createRoadmapStore: StateCreator<Store, [], [], RoadmapState & RoadmapActions> = (set, get) => ({
  roadmap: null,
  plans: [],
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
      await get().initializePlan(plans);
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
    console.log('🚗 [ROADMAP] Loading user journey for roadmap:', roadmapId);
    try {
      set({ roadmapLoading: true });
      const roadmap = await get().getRoadmap(roadmapId);
      console.log('🚗 [ROADMAP] Roadmap loaded:', roadmap?.id);

      const { milestones, onGoingMonth } = roadmap;
      const milestone = milestones[onGoingMonth - 1];
      const { id: milestoneId, plans } = milestone;
      console.log('🚗 [ROADMAP] Current milestone:', milestoneId, 'Has plans:', !!plans);

      if (!plans) {
        console.log('🗺️ [ROADMAP] Creating plans for milestone');
        const plans = await get().createPlans(roadmap, onGoingMonth);
        console.log('🗺️ [ROADMAP] Plans created:', plans?.length);
        await get().initializePlan(plans);
      } else {
        console.log('🗺️ [ROADMAP] Fetching existing plans');
        const plans = await get().getPlans({ roadmapId, milestoneId });
        console.log('🗺️ [ROADMAP] Plans fetched:', plans?.length);
        await get().initializePlan(plans);
      }
      console.log('🗺️ [ROADMAP] User journey loaded successfully');
    } catch (error) {
      console.error('🗺️ [ROADMAP] Load user journey error:', error);
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
  // ============================================
  // UPDATE THE ACTIVITY LOG ON PLAN UPDATE
  // ============================================
  updateActivtyLog: async (plan: PlanType): Promise<void> => {
    try {
      const { targetMacros, consumedMacros, number } = plan;
      const roadmap = get().roadmap;
      const data = {
        index: number - 1,
        consumedCalories: consumedMacros.cal,
        targetCalories: targetMacros.cal,
      };
      await api.patch(endpoints.roadmap.updateActivityLog(roadmap.id), data);
      await get().getRoadmap(roadmap.id);
    } catch (error) {
      console.error(error);
    }
  },
});
