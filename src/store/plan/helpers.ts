import type {
  IngredientType,
  MacroType,
  Meal,
  Macros,
  MealIngredient,
  UserClient,
  PlanType,
} from 'chikrice-types';

const MACRO_KEYS: MacroType[] = ['carb', 'pro', 'fat', 'free', 'custom'];

// -------------------------------------

// =====================================
// PLAN HELPERS
// =====================================
export function getCurrentTimeSlot() {
  const now = new Date();
  const hours = now.getHours();
  // Define time slots
  const timeSlots = [
    { start: 0, end: 6, slot: '00:00-06:00' },
    { start: 6, end: 9, slot: '06:00-09:00' },
    { start: 9, end: 12, slot: '09:00-12:00' },
    { start: 12, end: 15, slot: '12:00-15:00' },
    { start: 15, end: 18, slot: '15:00-18:00' },
    { start: 18, end: 21, slot: '18:00-21:00' },
    { start: 21, end: 24, slot: '21:00-24:00' },
  ];

  for (const { start, end, slot } of timeSlots) {
    if (hours >= start && hours < end) {
      return slot;
    }
  }

  return null;
}

// ============================================
// GET MEAL RECOMMENDED MACROS
// ============================================
export const getMealRecommendedMacros = (plan: Partial<PlanType>): Macros => {
  const { snacksCount, mealsCount, targetMacros } = plan;
  const { carb, pro, fat, cal } = targetMacros;

  const totalMealsCount = snacksCount + mealsCount;

  if (!totalMealsCount) return { cal: 0, carb: 0, pro: 0, fat: 0 };

  const recommendedMacros = {
    cal: Math.round(cal / totalMealsCount),
    carb: Math.round(carb / totalMealsCount),
    pro: Math.round(pro / totalMealsCount),
    fat: Math.round(fat / totalMealsCount),
  };

  return recommendedMacros;
};

// ============================================
// THE PORTION AMOUNT USED ON TOGGLING THE INGREDIENT
// ============================================
export const calculateOptimalPortionSize = (
  ingredient: IngredientType,
  meal: Meal,
  user: UserClient
): number => {
  return (
    getUserPortionPreference(ingredient.id, ingredient.macroType, user) ??
    calcDefaultPortionQty(ingredient, meal.recommendedMacros)
  );
};

// ============================================
// GET THE PREFERED INGREDIENT PORTION SIZE FROM USER HISTORY
// ============================================
export const getUserPortionPreference = (
  ingredientId: string,
  macroType: MacroType,
  user: UserClient
): number | null => {
  const mealPreferences = user?.mealPreferences;
  const timeSlot = getCurrentTimeSlot();
  return mealPreferences?.[timeSlot]?.[macroType]?.[ingredientId]?.portionSize ?? null;
};

// ============================================
// CALCULATE PORTION SIZE BASE ON HARD CODED RULES
// ============================================
export const calcDefaultPortionQty = (ingredient: IngredientType, recommendedMacros: Macros): number => {
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
};

// ============================================
// BUILD INGREDIENT WITH PROPER PORTION SIZE
// ============================================
export const buildPortionedIngredient = (
  ingredient: IngredientType | MealIngredient,
  qty: number
): MealIngredient => {
  const { serving } = ingredient;
  const { singleLabel, multipleLabel } = serving;

  const nf = serving?.nutrientFacts || { cal: 0, carb: 0, pro: 0, fat: 0 };
  const label = qty >= 2 ? multipleLabel : singleLabel;

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
};

// ============================================
// CALCULATE THE MEAL MACROS WHEN WE UPDATE IT
// ============================================
export const calcMealMacros = (meal: Meal): Macros => {
  const total: Macros = { cal: 0, carb: 0, pro: 0, fat: 0 };

  MACRO_KEYS.forEach((key) => {
    meal?.ingredients?.[key].forEach((ing) => {
      total.cal += ing?.macros?.cal || 0;
      total.carb += ing?.macros?.carb || 0;
      total.pro += ing?.macros?.pro || 0;
      total.fat += ing?.macros?.fat || 0;
    });
  });

  return total;
};

// ============================================
// CALCULATE THE PLAN MACROS WHEN WE UPDATE IT
// ============================================
export const calcPlanConsumedMacros = (meals: Meal[]): Macros => {
  const total: Macros = { cal: 0, carb: 0, pro: 0, fat: 0 };

  meals.forEach((meal) => {
    total.cal += meal.macros?.cal || 0;
    total.carb += meal.macros?.carb || 0;
    total.pro += meal.macros?.pro || 0;
    total.fat += meal.macros?.fat || 0;
  });

  return total;
};

// ============================================
// UPDATE THE MEAL INGREDIENT PORTION SIZE
// ============================================
export const updateIngredientInMeal = (
  plan: PlanType,
  mealIndex: number,
  ingredient: MealIngredient,
  quantityChange: number
): PlanType => {
  const updatedPlan = structuredClone(plan);
  const meal = updatedPlan.meals[mealIndex];
  const macroType = ingredient.macroType;
  const macroArr = meal.ingredients[macroType];

  const ingredientIdx = macroArr.findIndex((ing) => ing.ingredientId === ingredient.ingredientId);

  if (ingredientIdx === -1) {
    return updatedPlan;
  }

  const ingToUpdate = macroArr[ingredientIdx];
  const newQty = Math.max(0, ingToUpdate.portion.qty + quantityChange);

  if (newQty === 0) {
    macroArr.splice(ingredientIdx, 1);
  } else {
    ingToUpdate.id = ingToUpdate.ingredientId;
    const newIngredient = buildPortionedIngredient(ingToUpdate, newQty);
    macroArr[ingredientIdx] = newIngredient;
  }

  meal.macros = calcMealMacros(meal);
  updatedPlan.consumedMacros = calcPlanConsumedMacros(updatedPlan.meals);

  return updatedPlan;
};

export const isMealEmpty = (meal: Meal): boolean => {
  return Object.values(meal.ingredients).every((ingredients) => ingredients.length === 0);
};
