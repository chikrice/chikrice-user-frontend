import { http, HttpResponse } from 'msw';

import config from 'src/config-global';
import { endpoints } from 'src/utils/axios';

const baseURL = config.apiUrl;

export const roadmapHandlers = [
  http.get(baseURL + endpoints.roadmap.root(':id'), async ({ params }) => {
    const { id } = params;

    if (id === 'roadmap-123') {
      return HttpResponse.json({
        id: 'roadmap-123',
        milestones: [
          {
            id: 'milestone-1',
            startDate: '2024-01-01',
            endDate: '2024-01-30',
            macrosRatio: { protein: 30, carbs: 40, fat: 30 },
            targetCalories: 2000,
            plans: null,
          },
        ],
        onGoingMonth: 1,
      });
    }

    return HttpResponse.json({ error: 'Roadmap not found' }, { status: 404 });
  }),

  http.post(baseURL + endpoints.roadmap.create, async () => {
    return HttpResponse.json({
      id: 'new-roadmap-123',
      milestones: [
        {
          id: 'milestone-1',
          startDate: '2024-01-01',
          endDate: '2024-01-30',
          macrosRatio: { protein: 30, carbs: 40, fat: 30 },
          targetCalories: 2000,
          plans: null,
        },
      ],
      onGoingMonth: 1,
    });
  }),
];
