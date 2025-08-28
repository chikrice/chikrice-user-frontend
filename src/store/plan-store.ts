import { isToday } from 'date-fns';
import { StateCreator } from 'zustand';

import { api, endpoints } from 'src/utils/axios';

import {
  calculateOptimalPortionSize,
  buildPortionedIngredient,
  calcMealMacros,
  calcPlanConsumedMacros,
  updateIngredientInMeal,
  isMealEmpty,
} from './helpers';

import type { PlanActions, PlanState, Store } from 'src/types';

import type { PlanReference, IngredientType, MealIngredient, Meal } from 'chikrice-types';

// -------------------------------------

export const createPlanStore: StateCreator<Store, [], [], PlanState & PlanActions> = (set, get) => ({
  day: 1,
  plan: null,
  planLoading: false,
  planError: null,
  //
  initializePlan: async (plans: PlanReference[]) => {
    console.log('📋 [PLAN] Initializing plan with plans:', plans?.length);
    try {
      const todayPlan = plans.find((plan) => {
        const planDate = new Date(plan.date);
        return isToday(planDate);
      });
      console.log('📋 [PLAN] Today plan found:', todayPlan?.planId);

      const { planId, number } = todayPlan;
      if (planId && number) {
        console.log('📋 [PLAN] Getting plan details for:', planId);
        await get().getPlan(planId);
        set({ day: number });
        console.log('📋 [PLAN] Plan initialized successfully');
      } else {
        console.log('📋 [PLAN] No plan found for today');
        set({ plan: null, day: number, planError: 'No plan found for today' });
      }
    } catch (error) {
      console.error('📋 [PLAN] Initialize plan error:', error);
      set({ planError: error.message || 'Failed to get today plan' });
    }
  },
  getPlan: async (planId: string) => {
    try {
      const { data: plan } = await api.get(endpoints.plans.id(planId));
      set({ plan: plan, planError: null });
    } catch (error) {
      set({ planError: error.message || 'Failed to get active plan' });
    }
  },
  updatePlan: async (planId: string) => {
    try {
      const plan = get().plan;
      const { data: updatedPlan } = await api.patch(endpoints.plans.id(planId), { ...plan });
      set({ plan: updatedPlan, planError: null });
      await get().updateActivtyLog(updatedPlan);
    } catch (error) {
      set({ planError: error.message || 'Failed to get active plan' });
    }
  },
  updateDay: async (day: number) => {
    const plans = get().plans;
    const planId = plans[day - 1].planId;
    await get().getPlan(planId);
    set({ day });
  },
  toggleMealMode: (mealIndex: number, mode: 'view' | 'edit') => {
    const currentPlan = get().plan;
    const updatedPlan = structuredClone(currentPlan);
    const meal = updatedPlan.meals[mealIndex];

    if (mode === 'view' && isMealEmpty(meal)) {
      updatedPlan.meals.splice(mealIndex, 1);
      set({ plan: updatedPlan });
    } else {
      if (mode === 'view') {
        get().updateUserPreferences(meal, true, 0);
      }
      meal.mode = mode;
      set({ plan: updatedPlan });
    }
  },
  toggleIngredient: async (ingredient: IngredientType, mealIndex: number) => {
    const currentPlan = get().plan;
    const updatedPlan = structuredClone(currentPlan);

    const meal = updatedPlan.meals[mealIndex];
    const macroType = ingredient.macroType;
    const macroArr = meal.ingredients[macroType];
    const ingredientIdx = macroArr.findIndex((ing) => ing.ingredientId === ingredient?.id);

    if (ingredientIdx !== -1) {
      macroArr.splice(ingredientIdx, 1);
      get().updateUserPreferences(meal, false, -1);
    } else {
      const portionSize = calculateOptimalPortionSize(ingredient, meal, get().user);
      const newIngredient = buildPortionedIngredient(ingredient, portionSize);
      macroArr.push(newIngredient);
      get().updateUserPreferences(meal, false, 1);
    }

    meal.macros = calcMealMacros(meal);
    updatedPlan.consumedMacros = calcPlanConsumedMacros(updatedPlan.meals);

    set({ plan: updatedPlan });
  },
  incrementIngredient: (mealIndex: number, ingredient: MealIngredient) => {
    const currentPlan = get().plan;
    const breakpoint = ingredient.serving.breakpoint || 1;
    const updatedPlan = updateIngredientInMeal(currentPlan, mealIndex, ingredient, breakpoint);
    set({ plan: updatedPlan });
  },

  decrementIngredient: (mealIndex: number, ingredient: MealIngredient) => {
    const currentPlan = get().plan;
    const breakpoint = ingredient.serving.breakpoint || 1;
    const updatedPlan = updateIngredientInMeal(currentPlan, mealIndex, ingredient, -breakpoint);
    set({ plan: updatedPlan });
  },
  updateUserPreferences: async (meal: Meal, isPortion: boolean, count: 1 | -1 | 0): Promise<void> => {
    try {
      const user = get().user;
      await api.patch(endpoints.user.preferences(user.id), { meal, isPortion, count });
      await get().refreshUserInfo(user.id);
    } catch (error) {
      console.error(error);
    }
  },
});
