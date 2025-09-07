import { http, HttpResponse } from 'msw';

import config from 'src/config-global';
import { endpoints } from 'src/utils/axios';

const baseURL = config.apiUrl;

export const planHandlers = [
  http.post(baseURL + endpoints.plans.root, async ({ request }) => {
    // ... auth/me handler
  }),
];
