import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/guard';
import MainLayout from 'src/layouts/main';
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const UserAccountPage = lazy(() => import('src/pages/user/account'));
const UserProfilePage = lazy(() => import('src/pages/user/profile'));
const UserSettingsPage = lazy(() => import('src/pages/user/settings'));

// ----------------------------------------------------------------------

export const userRoutes = [
  {
    path: 'user',
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
      { element: <UserAccountPage />, index: true },
      { path: 'profile', element: <UserProfilePage /> },
      { path: 'settings', element: <UserSettingsPage /> },
    ],
  },
];
