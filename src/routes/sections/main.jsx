import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import MainLayout from 'src/layouts/main';
import StepperLayout from 'src/layouts/stepper';
import { AuthGuard, GuestGuard } from 'src/guard';
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const StepsPage = lazy(() => import('src/pages/steps'));
const ProgressPage = lazy(() => import('src/pages/progress'));
const DashboardPage = lazy(() => import('src/pages/dashboard'));
const CoachListPage = lazy(() => import('src/pages/coach/coach-list'));

// ----------------------------------------------------------------------
/* eslint react-refresh/only-export-components: off */
export const mainRoutes = [
  {
    element: (
      <MainLayout>
        <AuthGuard>
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
        </AuthGuard>
      </MainLayout>
    ),
    children: [
      { path: 'dashboard/:userId', element: <DashboardPage /> },
      { path: 'dashboard/', element: <DashboardPage /> },
      { path: 'coach', element: <CoachListPage /> },
      { path: 'progress', element: <ProgressPage /> },
    ],
  },
  {
    element: (
      <StepperLayout>
        <GuestGuard>
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
        </GuestGuard>
      </StepperLayout>
    ),
    children: [{ path: 'steps', element: <StepsPage /> }],
  },
];
