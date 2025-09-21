import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/guard';
import MainLayout from 'src/layouts/main';
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const UserProfilePage = lazy(() => import('src/pages/user/profile'));
const UserIngredientsPage = lazy(() => import('src/pages/user/ingredients'));

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
      { path: 'profile', element: <UserProfilePage /> },
      { path: 'ingredients', element: <UserIngredientsPage /> },
    ],
  },
];
