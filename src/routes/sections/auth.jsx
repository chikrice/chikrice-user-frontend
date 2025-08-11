import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { GuestGuard } from 'src/guard';
import CompactLayout from 'src/layouts/compact';
import AuthModernLayout from 'src/layouts/auth/modern';
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

// AUTH
const LoginPage = lazy(() => import('src/pages/auth/login'));
const VerifyPage = lazy(() => import('src/pages/auth/verify'));
const RegisterPage = lazy(() => import('src/pages/auth/register'));
const NewPasswordPage = lazy(() => import('src/pages/auth/new-password'));
const ForgotPasswordPage = lazy(() => import('src/pages/auth/forgot-password'));

// ----------------------------------------------------------------------

export const authRoutes = {
  path: 'auth',
  element: (
    <GuestGuard>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </GuestGuard>
  ),
  children: [
    {
      path: 'login',
      element: (
        <AuthModernLayout>
          <LoginPage />
        </AuthModernLayout>
      ),
    },
    {
      path: 'register',
      element: (
        <AuthModernLayout>
          <RegisterPage />
        </AuthModernLayout>
      ),
    },
    {
      element: (
        <CompactLayout>
          <Outlet />
        </CompactLayout>
      ),
      children: [
        { path: 'verify', element: <VerifyPage /> },
        { path: 'new-password', element: <NewPasswordPage /> },
        { path: 'forgot-password', element: <ForgotPasswordPage /> },
      ],
    },
  ],
};
