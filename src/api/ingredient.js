import useSWR from 'swr';
import { useMemo } from 'react';

import { endpoints, fetcher } from 'src/utils/axios';

export function useSearchIngredients(userId, query) {
  const URL = [endpoints.ingredient.search, { params: { userId, query } }];

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false,
  });

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.result || null,
      resultType: data?.resultType,
      searchLoading: isLoading,
      error,
      isValidating,
    }),
    [data, isLoading, error, isValidating]
  );

  return memoizedValue;
}

export function useIngredientsByCategories() {
  const URL = [endpoints.ingredient.categories];

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      ingredients: data || null,
      isLoading,
      error,
      isValidating,
    }),
    [data, isLoading, error, isValidating]
  );

  return memoizedValue;
}
