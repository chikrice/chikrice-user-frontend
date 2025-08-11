import { create } from 'zustand';

import { createAuthStore } from './auth-store';
import { createPlanStore } from './plan-store';

const useStore = create((...args) => ({
  ...createAuthStore(...args),
  ...createPlanStore(...args),
}));

export default useStore;
