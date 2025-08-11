import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { endpoints, fetcher } from 'src/utils/axios';

export function useMealSuggestions(planId, params) {
  const URL = [endpoints.plan_month.suggestions(planId), { params }];

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

export async function getMontlyPlan(planId) {
  const URL = endpoints.plan_month.get(planId);
  return axios
    .get(URL)
    .then((res) => res)
    .catch((err) => console.log(err));
}

export async function createPlanMonth(data) {
  const URL = endpoints.plan_month.create;
  return axios
    .post(URL, data)
    .then((res) => res)
    .catch((err) => console.log(err));
}
