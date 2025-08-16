import { isToday } from 'date-fns';

import axios, { endpoints } from 'src/utils/axios';

export const createPlanStore = (set, get) => ({
  roadmap: null,
  plans: null,
  todayPlan: null,
  isLoading: false,
  error: null,

  // =====================================
  // CREATE THE USER ROADMAP ON REGISTER
  // =====================================
  createUserJourney: async (userInputs) => {
    try {
      set({ isLoading: true });
      const roadmap = await get().createRoadmap(userInputs);
      const plans = await get().createPlans(roadmap, 1);
      get().getTodayPlan(plans);
    } catch (error) {
      set({ error: error.message || 'Failed to create user journey' });
    } finally {
      set({ isLoading: false });
    }
  },

  // =====================================
  // INITIALIZE USER DATA
  // =====================================
  loadUserJourney: async (roadmapId) => {
    try {
      set({ isLoading: true });
      const roadmap = await get().getRoadmap(roadmapId);
      const { milestones, onGoingMonth } = roadmap;
      const milestone = milestones[onGoingMonth - 1];
      const { id: milestoneId, plans } = milestone;

      if (!plans) {
        const plans = await get().createPlans(roadmap, onGoingMonth);
        get().getTodayPlan(plans);
      } else {
        const plans = await get().getPlans({ roadmapId, milestoneId });
        get().getTodayPlan(plans);
      }
    } catch (error) {
      set({ error: error.message || 'Failed to load user journey' });
    } finally {
      set({ isLoading: false });
    }
  },

  // =====================================
  // CREATES NEW ROADMAP
  // =====================================
  createRoadmap: async (data) => {
    try {
      const { data: roadmap } = await axios.post(endpoints.roadmap.create, data);
      set({ roadmap, error: null });
      return roadmap;
    } catch (error) {
      console.log(error);
      set({ error: error.message || 'Failed to initialize roadmap' });
    }
  },

  // =====================================
  // CREATE PLANS FOR ROADMAP MILESTONES
  // =====================================
  createPlans: async (roadmap, month) => {
    try {
      const data = get().transformRoadmapToPlanData(roadmap, month);
      const { data: plans } = await axios.post(endpoints.plans.create, data);

      set({ plans, error: null });
      return plans;
    } catch (error) {
      set({ error: error.message || 'Failed to create plan_month' });
    }
  },

  // =====================================
  // GET THE ROADMAP
  // =====================================
  getRoadmap: async (roadmapId) => {
    try {
      const { data: roadmap } = await axios.get(endpoints.roadmap.root(roadmapId));
      set({ roadmap });

      return roadmap;
    } catch (error) {
      set({ error: error.message || 'Failed to get roadmap' });
    }
  },

  // =====================================
  // GET ROADMAP MILESTONE PLANS
  // =====================================
  getPlans: async (data) => {
    try {
      const { data: plans } = await axios.get(endpoints.plans.query, { params: data });
      set({ plans });
      return plans;
    } catch (error) {
      set({ error: error.message || 'Failed to get plan_month' });
    }
  },

  // =====================================
  // GET THE DASHBOARD TODAY PLAN
  // =====================================
  getTodayPlan: (plans) => {
    try {
      console.log(plans);
      const todayPlan = plans.find((plan) => {
        const planDate = new Date(plan.date);
        return isToday(planDate);
      });

      if (todayPlan) {
        set({ todayPlan, error: null });
      } else {
        set({ todayPlan: null, error: 'No plan found for today' });
      }
    } catch (error) {
      set({ error: error.message || 'Failed to get today plan' });
    }
  },

  // =====================================
  // HELPER FUNCTIONS
  // =====================================
  transformRoadmapToPlanData: (roadmap, month) => {
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
