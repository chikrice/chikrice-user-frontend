import { http, HttpResponse } from 'msw';

import config from 'src/config-global';
import { endpoints } from 'src/utils/axios';

// -------------------------------------

const baseURL = config.apiUrl;

export const planHandlers = [
  http.post(baseURL + endpoints.plans.root, async () => {
    // Mock successful plan creation
    return HttpResponse.json([
      {
        id: 'plan-1',
        number: 1,
        date: '2024-01-01',
        targetMacros: { cal: 2000, protein: 150, carbs: 200, fat: 67 },
        consumedMacros: { cal: 0, protein: 0, carbs: 0, fat: 0 },
        meals: [],
      },
      {
        id: 'plan-2',
        number: 2,
        date: '2024-01-02',
        targetMacros: { cal: 2000, protein: 150, carbs: 200, fat: 67 },
        consumedMacros: { cal: 0, protein: 0, carbs: 0, fat: 0 },
        meals: [],
      },
    ]);
  }),

  http.get(baseURL + endpoints.plans.root, async () => {
    // Mock getting existing plans
    return HttpResponse.json([
      {
        id: 'plan-1',
        number: 1,
        date: '2024-01-01',
        targetMacros: { cal: 2000, protein: 150, carbs: 200, fat: 67 },
        consumedMacros: { cal: 0, protein: 0, carbs: 0, fat: 0 },
        meals: [],
      },
    ]);
  }),
];
