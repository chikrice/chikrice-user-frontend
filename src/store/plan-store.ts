import { isToday } from 'date-fns';
import { StateCreator } from 'zustand';

import { api, endpoints } from 'src/utils/axios';

import type { PlanActions, PlanState, Store } from 'src/types';

import type { PlanReference } from 'chikrice-types';

export const createPlanStore: StateCreator<Store, [], [], PlanState & PlanActions> = (set, get) => ({
  day: 1,
  plan: null,
  planLoading: false,
  planError: null,
  //
  initializePlan: async (plans: PlanReference[]) => {
    try {
      const todayPlan = plans.find((plan) => {
        const planDate = new Date(plan.date);
        return isToday(planDate);
      });
      const { planId, number } = todayPlan;

      if (planId && number) {
        await get().getPlan(planId);
      } else {
        set({ plan: null, day: number, planError: 'No plan found for today' });
      }
    } catch (error) {
      set({ planError: error.message || 'Failed to get today plan' });
    }
  },
  getPlan: async (planId: string) => {
    try {
      set({ planLoading: true });
      const { data: plan } = await api.get(endpoints.plans.id(planId));
      set({ plan: plan, planError: null });
    } catch (error) {
      set({ planError: error.message || 'Failed to get active plan' });
    } finally {
      set({ planLoading: false });
    }
  },
  updateDay: async (day: number) => {
    const plans = get().plans;
    const planId = plans[day - 1].planId;
    await get().getPlan(planId);
    set({ day });
  },
  // updateplan
  // calculateMealMacros on meal update
  // calculateplan macros on mealupdate
  //
});
