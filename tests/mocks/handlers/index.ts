import { authHandlers } from './auth';
import { planHandlers } from './plan';
import { roadmapHandlers } from './roadmap';

export const handlers = [...authHandlers, ...roadmapHandlers, ...planHandlers];
