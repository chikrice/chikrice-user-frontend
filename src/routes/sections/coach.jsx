import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CoachGuard } from 'src/guard';
import MainLayout from 'src/layouts/main';
import CoachLayout from 'src/layouts/coach';
import { SplashScreen } from 'src/components/loading-screen';

const CoachProfilePage = lazy(() => import('src/pages/coach/coach-profile'));
const CoachClientPage = lazy(() => import('src/pages/coach/coach-client'));
const CoachClientsPage = lazy(() => import('src/pages/coach/coach-clients'));

export const coachRoutes = [
  {
    element: (
      <CoachLayout>
        <CoachGuard>
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
        </CoachGuard>
      </CoachLayout>
    ),
    children: [
      { path: 'clients', element: <CoachClientsPage />, index: true },
      { path: 'client/:clientId', element: <CoachClientPage /> },
    ],
  },
  {
    element: (
      <MainLayout>
        <CoachGuard>
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
        </CoachGuard>
      </MainLayout>
    ),
    children: [{ path: 'user/coach-profile', element: <CoachProfilePage />, index: true }],
  },
];
