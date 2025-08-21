import useSWR from 'swr';
import { useMemo } from 'react';

import { api, fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

export function useGetOrders(userId) {
  const URL = endpoints.user.orders(userId);

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      orders: data?.orders || [],
      totalCount: data?.totalCount,
      pendingCount: data?.pendingCount,
      processingCount: data?.processingCount,
      completedCount: data?.completedCount,
      cancelledCount: data?.cancelledCount,
      refundedCount: data?.refundedCount,
      ordersLoading: isLoading,
      ordersError: error,
      ordersValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetUser(userId) {
  const URL = endpoints.user.get(userId);

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
    revalidateOnFocus: false,
  });

  const memoizedValue = useMemo(
    () => ({
      user: data || null,
      isLoading,
      error,
      isValidating,
    }),
    [data, isLoading, error, isValidating]
  );

  return memoizedValue;
}

export async function updateUser(userId, data) {
  return await api.patch(endpoints.user.update(userId), data);
}

export async function initCoachCollab(userId, data) {
  return await api.post(endpoints.user.initCollab(userId), data);
}
