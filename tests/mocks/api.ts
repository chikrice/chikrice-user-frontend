import { http, HttpResponse } from 'msw';

import config from 'src/config-global';
import { endpoints } from 'src/utils/axios';

const baseURL = config.apiUrl;

// In tests/mocks/api.ts
export const handlers = [
  http.post(baseURL + endpoints.auth.me, async ({ request }) => {
    const body: any = await request.json();

    if (body.accessToken === 'valid-access-token') {
      return HttpResponse.json({
        user: {
          id: 'abc-123',
          firstName: 'John',
          lastName: 'Maverick',
          roadmapId: 'roadmap-123',
        },
      });
    }

    return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }),
  //
  http.get(baseURL + endpoints.roadmap.root('roadmap-123'), async () => {
    return HttpResponse.json({
      id: 'roadmap-123',
    });
  }),
];
