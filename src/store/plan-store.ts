import { isToday } from 'date-fns';
import { StateCreator } from 'zustand';

import { api, endpoints } from 'src/utils/axios';

import { getCurrentTimeSlot } from './helpers';

import type { PlanActions, PlanState, Store } from 'src/types';

import type { PlanReference, IngredientType, MacroType, Meal, Macros, MealIngredient } from 'chikrice-types';

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

    if (!currentPlan) return;

    // Create deep copy of the entire plan
    const updatedPlan = structuredClone(currentPlan);

    const meal = updatedPlan.meals[mealIndex];
    const macroType = ingredient.macroType;
    const macroArr = meal.ingredients[macroType];
    const ingredientIdx = macroArr.findIndex((ing) => ing.ingredientId === ingredient.id);

    if (ingredientIdx !== -1) {
      // Remove ingredient
      macroArr.splice(ingredientIdx, 1);
    } else {
      const portionSize = get().calculateOptimalPortionSize(ingredient, meal);
      const newIngredient = get().buildPortionedIngredient(ingredient, portionSize);
      macroArr.push(newIngredient);
    }

    // Update the store with the new plan
    set({ plan: updatedPlan });

    // Recalculate macros if needed
    // await get().calculateMealMacros(mealIndex);
    // await get().calculatePlanMacros();
  },
  incrementIngredient: () => {
    console.log('inc');
  },
  decrementIngredient: () => {
    console.log('dec');
  },
  calculateOptimalPortionSize: (ingredient: IngredientType, meal: Meal): number => {
    return (
      get().getUserPortionPreference(ingredient.id, ingredient.macroType) ??
      get().calcDefaultPortionQty(ingredient, meal.recommendedMacros)
    );
  },
  getUserPortionPreference: (ingredientId: string, macroType: MacroType): number | null => {
    const mealPreferences = get().user.mealPreferences;
    const timeSlot = getCurrentTimeSlot();
    return mealPreferences[timeSlot]?.[macroType]?.[ingredientId]?.portionSize ?? null;
  },
  calcDefaultPortionQty: (ingredient: IngredientType, recommendedMacros: Macros): number => {
    const { macroType, serving, category } = ingredient;
    if (!serving || !serving.nutrientFacts) return 1;

    if (category === 'proteins' || category === 'carbs') {
      const macro = macroType as keyof Macros;
      const target = recommendedMacros[macro] ?? 0;
      const perServing = serving.nutrientFacts[macro] ?? 0;
      if (!perServing) return 1;

      const rawQty = target / perServing;
      const bp = serving.breakpoint ?? 1;
      // Snap to nearest 0.5 or to breakpoint multiples if provided
      const snapped = Math.max(0.5, Math.round(rawQty / bp) * bp);
      return +snapped.toFixed(2);
    }

    return 1;
  },
  buildPortionedIngredient: (ingredient: IngredientType, qty: number): MealIngredient => {
    const { serving } = ingredient;
    const { singleLabel, multipleLabel } = serving;

    const nf = serving?.nutrientFacts || { cal: 0, carb: 0, pro: 0, fat: 0 };
    const label = qty >= 2 ? multipleLabel : singleLabel;
    console.log(label);

    return {
      // Only include fields that belong to MealIngredient schema
      ingredientId: ingredient.id,
      name: ingredient.name,
      icon: ingredient.icon || '',
      macroType: ingredient.macroType,
      serving: {
        weightInGrams: serving?.weightInGrams || 0,
        breakpoint: serving?.breakpoint || 1,
        singleLabel: serving?.singleLabel,
        multipleLabel: serving?.multipleLabel,
        nutrientFacts: nf,
      },
      isAiGenerated: false,
      portion: {
        qty,
        label,
        weightInGrams: (serving?.weightInGrams || 0) * qty,
      },
      macros: {
        cal: (nf.cal || 0) * qty,
        carb: (nf.carb || 0) * qty,
        pro: (nf.pro || 0) * qty,
        fat: (nf.fat || 0) * qty,
      },
    };
  },
});
