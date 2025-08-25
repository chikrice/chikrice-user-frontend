import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import { api, endpoints, fetcher } from 'src/utils/axios';

// -------------------------------------

// =====================================
// GET PLAN
// =====================================
export function useGetPlan(planId) {
  const URL = planId ? endpoints.plans.id(planId) : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    revalidateOnFocus: false,
  });

  const memoizedValue = useMemo(
    () => ({
      plan: data,
      planLoading: isLoading,
      planError: error,
      planValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// =====================================
// HOOK FOR GETTING SUGGESTED MEALS
// =====================================
export function useMealSuggestions(planId, params) {
  const URL = [endpoints.plans.meals.suggestions(planId), { params }];

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    revalidateOnFocus: false,
  });

  const memoizedValue = useMemo(
    () => ({
      suggestions: data || [],
      suggestionsLoading: isLoading,
      suggestionsError: error,
      planValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// =====================================
// CREATE EMPTY MEAL TEMPLATE
// =====================================
export async function createMeal(planId) {
  await api.post(endpoints.plans.meals.create(planId));
  await mutate(endpoints.plans.id(planId));
}
