import useSWR from 'swr';
import { useMemo } from 'react';

import { endpoints, fetcher } from 'src/utils/axios';

// -------------------------------------

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
