import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { GuestGuard } from 'src/guard';
import HomeLayout from 'src/layouts/home';
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const Page500 = lazy(() => import('src/pages/500'));
const Page403 = lazy(() => import('src/pages/403'));
const Page404 = lazy(() => import('src/pages/404'));
const HomePage = lazy(() => import('src/pages/home'));
const FaqsPage = lazy(() => import('src/pages/faqs'));

// const AboutPage = lazy(() => import('src/pages/about'));
// const ContactPage = lazy(() => import('src/pages/contact-us'));
const ComingSoonPage = lazy(() => import('src/pages/coming-soon'));
const MaintenancePage = lazy(() => import('src/pages/maintenance'));

// ----------------------------------------------------------------------
/* eslint react-refresh/only-export-components: off */
export const genralRoutes = [
  {
    element: (
      <HomeLayout>
        <GuestGuard>
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
        </GuestGuard>
      </HomeLayout>
    ),
    children: [
      {
        path: '/',
        element: <HomePage />,
        index: true,
      },
      { path: 'about-us', element: <ComingSoonPage /> },
      { path: 'contact-us', element: <ComingSoonPage /> },
      { path: 'faqs', element: <FaqsPage /> },
      { path: 'coming-soon', element: <ComingSoonPage /> },
      { path: 'maintenance', element: <MaintenancePage /> },
      { path: '500', element: <Page500 /> },
      { path: '404', element: <Page404 /> },
      { path: '403', element: <Page403 /> },
    ],
  },
];
