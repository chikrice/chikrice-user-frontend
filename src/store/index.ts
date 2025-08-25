import { create } from 'zustand';

import { createAuthStore } from './auth-store';
import { createPlanStore } from './plan-store';
import { createRoadmapStore } from './roadmap-store';

import type { Store } from 'src/types';

const useStore = create<Store>((...args) => ({
  ...createAuthStore(...args),
  ...createRoadmapStore(...args),
  ...createPlanStore(...args),
}));

export default useStore;
