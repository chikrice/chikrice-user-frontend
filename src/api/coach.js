import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

export function useGetCoach(coachId) {
  const URL = endpoints.coach.root(coachId);

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    revalidateOnFocus: false,
  });

  const memoizedValue = useMemo(
    () => ({
      coach: data || null,
      isLoading,
      error,
      isValidating,
    }),
    [data, isLoading, error, isValidating]
  );

  return memoizedValue;
}

export function useGetCoaches() {
  const URL = endpoints.coach.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    revalidateOnFocus: false,
  });

  const memoizedValue = useMemo(
    () => ({
      coaches: data?.results || [],
      isLoading,
      error,
      isValidating,
    }),
    [data, isLoading, error, isValidating]
  );

  return memoizedValue;
}

export function useGetCoachClients(coachId) {
  const URL = endpoints.coach.client.list(coachId);

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    revalidateOnFocus: false,
  });

  const memoizedValue = useMemo(
    () => ({
      clients: data?.results || [],
      isLoading,
      error,
      isValidating,
    }),
    [data, isLoading, error, isValidating]
  );

  return memoizedValue;
}

export function useGetCoachClient(coachId, clientId) {
  const URL = [endpoints.coach.client.root, { params: { coachId, clientId } }];

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    revalidateOnFocus: false,
  });

  const memoizedValue = useMemo(
    () => ({
      client: data || null,
      isLoading,
      error,
      isValidating,
    }),
    [data, isLoading, error, isValidating]
  );

  return memoizedValue;
}
