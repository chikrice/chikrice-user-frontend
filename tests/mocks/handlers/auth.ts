import { http, HttpResponse } from 'msw';

import config from 'src/config-global';
import { endpoints } from 'src/utils/axios';

// -------------------------------------

const baseURL = config.apiUrl;

export const authHandlers = [
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
    if (body.accessToken === 'valid-access-token-no-roadmap') {
      return HttpResponse.json({
        user: {
          id: 'abc-123',
          firstName: 'John',
          lastName: 'Maverick',
          roadmapId: null,
        },
      });
    }

    return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }),

  http.post(baseURL + endpoints.auth.refreshTokens, async ({ request }) => {
    const body: any = await request.json();

    if (body.refreshToken === 'valid-refresh-token') {
      return HttpResponse.json({
        access: {
          token: 'valid-access-token',
          expires: '2025-12-31T23:00:00',
        },
        refresh: {
          token: 'valid-refresh-token',
          expires: '2026-12-31T23:00:00',
        },
      });
    }
    if (body.refreshToken === 'valid-refresh-token-no-roadmap') {
      return HttpResponse.json({
        access: {
          token: 'valid-access-token-no-roadmap',
          expires: '2025-12-31T23:00:00',
        },
        refresh: {
          token: 'valid-refresh-token',
          expires: '2026-12-31T23:00:00',
        },
      });
    }

    return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }),

  http.post(baseURL + endpoints.auth.login, async ({ request }) => {
    const body: any = await request.json();

    if (body.email === 'user@example.com' && body.password === 'password123') {
      return HttpResponse.json({
        user: {
          id: 'user-123',
          firstName: 'John',
          lastName: 'Doe',
          email: body.email,
          roadmapId: 'roadmap-123',
        },
        tokens: {
          access: {
            token: 'login-access-token',
            expires: '2025-12-31T23:00:00',
          },
          refresh: {
            token: 'login-refresh-token',
            expires: '2026-12-31T23:00:00',
          },
        },
      });
    }

    if (body.email === 'user-no-roadmap@example.com' && body.password === 'password123') {
      return HttpResponse.json({
        user: {
          id: 'user-456',
          firstName: 'Jane',
          lastName: 'Smith',
          email: body.email,
          roadmapId: null,
        },
        tokens: {
          access: {
            token: 'login-access-token-no-roadmap',
            expires: '2025-12-31T23:00:00',
          },
          refresh: {
            token: 'login-refresh-token-no-roadmap',
            expires: '2026-12-31T23:00:00',
          },
        },
      });
    }

    return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }),

  http.post(baseURL + endpoints.auth.register, async ({ request }) => {
    const body: any = await request.json();

    if (body.email === 'error@test.com') {
      return HttpResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    return HttpResponse.json({
      user: {
        id: 'new-user-123',
        firstName: 'Jane',
        lastName: 'Doe',
        email: body.email,
        roadmapId: null,
      },
      tokens: {
        access: {
          token: 'new-access-token',
          expires: '2025-12-31T23:00:00',
        },
        refresh: {
          token: 'new-refresh-token',
          expires: '2026-12-31T23:00:00',
        },
      },
    });
  }),
];
