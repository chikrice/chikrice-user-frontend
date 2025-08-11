import useSWR from 'swr';
import { useMemo } from 'react';

import axios, { endpoints, fetcher } from 'src/utils/axios';

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
  return await axios.get(URL);
}

export async function createUserRoadmap(data) {
  const URL = endpoints.roadmap.create;
  return await axios.post(URL, data);
}

export async function updateActivityLog(roadmapId, data) {
  const URL = endpoints.roadmap.updateActivityLog(roadmapId);
  return await axios.patch(URL, data);
}
