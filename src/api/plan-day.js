import useSWR, { mutate } from 'swr';
import { useCallback, useMemo } from 'react';

import axios, { endpoints, fetcher } from 'src/utils/axios';

// hooks
export function useGetPlanDay(planId) {
  const URL = planId ? endpoints.plan_day.root(planId) : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    revalidateOnFocus: false,
  });

  const memoizedValue = useMemo(
    () => ({
      plan: data || { meals: [] },
      planLoading: isLoading,
      planError: error,
      planValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export const useInitCustomMeal = (planId) => {
  return useCallback(async () => {
    try {
      const URL = endpoints.plan_day.meal.root(planId);
      await axios.post(URL);
      await mutate(endpoints.plan_day.root(planId));
    } catch (error) {
      console.error('Error creating custom meal:', error);
    }
  }, [planId]);
};

// plan
export async function mutatePlanDay(planId) {
  const URL = endpoints.plan_day.root(planId);
  try {
    const res = await axios.get(URL);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export async function deletePlanDay(planId) {
  const URL = endpoints.plan_day.root(planId);
  return await axios.delete(URL);
}
export async function chikricePlanner(planId) {
  const URL = endpoints.plan_day.root(planId);
  return await axios.patch(URL);
}
export async function toogleSavePlanDay(planId, data) {
  const URL = endpoints.plan_day.root(planId);
  return await axios.post(URL, data);
}

// meal
export async function switchMealOption(planId, data) {
  const URL = endpoints.plan_day.meal.switch(planId);
  return await axios.patch(URL, data);
}
export async function updateAllMeals(planId) {
  const URL = endpoints.plan_day.meal.shuffle(planId);
  return await axios.patch(URL);
}
export async function copyMeals(planId, data) {
  const URL = endpoints.plan_day.meal.copy(planId);
  return await axios.patch(URL, data);
}

export async function updatePlanDayMeal(planId, data) {
  const URL = endpoints.plan_day.meal.root(planId);
  return await axios.patch(URL, data);
}
export async function togglePlanDayMealIngredient(planId, data) {
  const URL = endpoints.plan_day.meal.toggleIngredient(planId);
  return await axios.patch(URL, data);
}
export async function deletePlanDayMeal(planId, mealId) {
  const URL = endpoints.plan_day.meal.root(planId + '?mealId=' + mealId);
  return await axios.delete(URL);
}
export async function toggleMealMode(planId, data) {
  const URL = endpoints.plan_day.meal.toggleMode(planId);
  return await axios.patch(URL, data);
}

export async function submitMealWithAi(planId, data) {
  const URL = endpoints.plan_day.meal.submitMealWithAi(planId);
  return await axios.patch(URL, data);
}
export async function addSuggestedMealToPlanDayMeals(planId, data) {
  const URL = endpoints.plan_day.meal.addSuggestedMeal(planId);
  return await axios.patch(URL, data);
}
