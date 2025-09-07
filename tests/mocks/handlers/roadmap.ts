import { http, HttpResponse } from 'msw';

import config from 'src/config-global';
import { endpoints } from 'src/utils/axios';

const baseURL = config.apiUrl;

export const roadmapHandlers = [
  http.get(baseURL + endpoints.roadmap.root(':id'), async ({ params }) => {
    // ... roadmap handler
  }),

  http.post(baseURL + endpoints.roadmap.create, async ({ request }) => {
    // ... roadmap create handler
  }),
];
