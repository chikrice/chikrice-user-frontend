import { Navigate, useRoutes } from 'react-router-dom';

import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { userRoutes } from './user';
import { genralRoutes } from './general';

// ----------------------------------------------------------------------

// I am breaking the routes into
// general -> pages that don't need guards and can be seen by both users and guests
// one small tweek can be done by removing the home page from general to
// auth
// main
// coach

export default function Router() {
  return useRoutes([
    // General routes
    ...genralRoutes,

    // Auth routes
    authRoutes,

    // Main routes
    ...mainRoutes,
    ...userRoutes,

    // No match 404
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
