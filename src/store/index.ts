import { create } from 'zustand';

import { createAuthStore } from './auth';
import { createPlanStore } from './plan';
import { createRoadmapStore } from './roadmap';

import type { Store } from 'src/types';

const useStore = create<Store>((...args) => ({
  ...createAuthStore(...args),
  ...createRoadmapStore(...args),
  ...createPlanStore(...args),
}));

export default useStore;
