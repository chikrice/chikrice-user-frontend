import useSWR from 'swr';
import { useMemo } from 'react';

import { endpoints, fetcher } from 'src/utils/axios';

export function useSearchIngredients(userId: string, query: string) {
  const URL = userId ? [endpoints.ingredient.search, { params: { userId, query } }] : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher, {
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
      mutate,
    }),
    [data, isLoading, error, isValidating, mutate]
  );

  return memoizedValue;
}

export function useUserIngredients(userId: string) {
  const URL = userId ? [endpoints.user.ingredients(userId)] : null;

  const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      ingredients: data || [],
      isLoading,
      error,
      isValidating,
      mutate,
    }),
    [data, isLoading, error, isValidating, mutate]
  );

  return memoizedValue;
}
