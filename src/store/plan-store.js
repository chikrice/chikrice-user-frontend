import axios, { endpoints } from 'src/utils/axios';

import { getDefaultWeekAndDayFromPlan } from './helpers';

export const createPlanStore = (set, get) => ({
  roadmap: null,
  planMonth: null,
  planMonthId: null,
  planDay: null,
  todayPlan: null,
  thisWeekNumber: null,
  loading: false,
  error: null,
  //
  createRoadmap: async (data) => {
    set({ loading: true });
    try {
      const { data: roadmap } = await axios.post(endpoints.roadmap.create, data);
      console.log(roadmap);
      await get().createPlanMonth(roadmap.id);

      set({ roadmap, error: null });
    } catch (error) {
      set({ error: error.message || 'Failed to initialize roadmap' });
    } finally {
      set({ loading: false });
    }
  },
  //
  createPlanMonth: async (roadmapId) => {
    try {
      set({ loading: true });
      const { data: planMonth } = await axios.post(endpoints.plan_month.create, { roadmapId });
      const { data: roadmap } = await axios.get(endpoints.roadmap.root(roadmapId));

      const { thisWeekNumber, todayPlan } = getDefaultWeekAndDayFromPlan(planMonth);
      const planDay = planMonth.data.flatMap((week) => week.days);
      const planMonthId = planMonth.id;

      set({ roadmap, planMonth, planDay, todayPlan, thisWeekNumber, planMonthId, error: null });
    } catch (error) {
      set({ error: error.message || 'Failed to create plan_month' });
    } finally {
      set({ loading: false });
    }
  },
  //
  getRoadmap: async (roadmapId) => {
    try {
      set({ loading: true });
      const { data: roadmap } = await axios.get(endpoints.roadmap.root(roadmapId));

      const planMonthId = roadmap.milestones[roadmap.onGoingMonth - 1].planId;
      await get().getPlanMonth(planMonthId);

      set({ roadmap });
    } catch (error) {
      set({ error: error.message || 'Failed to get roadmap' });
    } finally {
      set({ loading: false });
    }
  },
  //
  getPlanMonth: async (planMonthId) => {
    try {
      set({ loading: true });
      const { data: planMonth } = await axios.get(endpoints.plan_month.get(planMonthId));

      const { thisWeekNumber, todayPlan } = getDefaultWeekAndDayFromPlan(planMonth);
      const planDay = planMonth.data.flatMap((week) => week.days);

      set({ planMonth, planDay, todayPlan, thisWeekNumber, planMonthId, error: null });
    } catch (error) {
      set({ error: error.message || 'Failed to get plan_month' });
    } finally {
      set({ loading: false });
    }
  },
});
