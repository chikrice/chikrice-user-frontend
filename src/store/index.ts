import { create } from 'zustand';

import { createAuthStore } from './auth-store';
import { createPlanStore } from './plan-store';

import type { Store } from 'src/types';

const useStore = create<Store>((...args) => ({
  ...createAuthStore(...args),
  ...createPlanStore(...args),
}));

export default useStore;
