import { isToday } from 'date-fns';
import { StateCreator } from 'zustand';

import { api, endpoints } from 'src/utils/axios';

import {
  calculateOptimalPortionSize,
  buildPortionedIngredient,
  calcMealMacros,
  calcPlanConsumedMacros,
  updateIngredientInMeal,
} from './helpers';

import type { PlanActions, PlanState, Store } from 'src/types';

import type { PlanReference, IngredientType, MealIngredient } from 'chikrice-types';

// -------------------------------------

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
        set({ day: number });
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
  toggleIngredient: async (ingredient: IngredientType, mealIndex: number) => {
    const currentPlan = get().plan;
    const updatedPlan = structuredClone(currentPlan);

    const meal = updatedPlan.meals[mealIndex];
    const macroType = ingredient.macroType;
    const macroArr = meal.ingredients[macroType];
    const ingredientIdx = macroArr.findIndex((ing) => ing.ingredientId === ingredient.id);

    if (ingredientIdx !== -1) {
      macroArr.splice(ingredientIdx, 1);
    } else {
      const portionSize = calculateOptimalPortionSize(ingredient, meal, get().user);
      const newIngredient = buildPortionedIngredient(ingredient, portionSize);
      macroArr.push(newIngredient);
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
});
