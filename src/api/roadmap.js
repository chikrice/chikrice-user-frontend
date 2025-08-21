import useSWR from 'swr';
import { useMemo } from 'react';

import { api, endpoints, fetcher } from 'src/utils/axios';

export function useGetRoadmap(roadmapId) {
  const URL = endpoints.roadmap.root(roadmapId);

  const { data, isLoading, isValidating, error } = useSWR(URL, fetcher, {
    revalidateOnFocus: false,
  });

  const memmoizedValue = useMemo(
    () => ({
      roadmap: data || null,
      isLoading,
      isValidating,
      error,
    }),
    [data, isLoading, isValidating, error]
  );

  return memmoizedValue;
}

export async function getUserRoadmap(roadmapId) {
  const URL = endpoints.roadmap.root(roadmapId);
  return await api.get(URL);
}

export async function createUserRoadmap(data) {
  const URL = endpoints.roadmap.create;
  return await api.post(URL, data);
}

export async function updateActivityLog(roadmapId, data) {
  const URL = endpoints.roadmap.updateActivityLog(roadmapId);
  return await api.patch(URL, data);
}
