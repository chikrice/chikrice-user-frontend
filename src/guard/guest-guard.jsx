import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';

import useStore from 'src/store';
import { SplashScreen } from 'src/components/loading-screen';
import { useRouter, useSearchParams, usePathname } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const { loading, authenticated } = useStore();

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <Container authenticated={authenticated}> {children}</Container>
      )}
    </>
  );
}

GuestGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

function Container({ children, authenticated }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const returnTo = searchParams.get('returnTo') || '/dashboard';

  const check = useCallback(() => {
    console.log('GuestGuard check:', {
      authenticated,
      pathname,
      returnTo,
      windowLocation: window.location.pathname,
      windowHref: window.location.href,
    });

    if (authenticated) {
      const guestOnlyPaths = ['/', '/auth/login', '/auth/register', '/auth/forgot-password'];

      // Check if we're on a guest-only path
      if (guestOnlyPaths.includes(pathname)) {
        console.log('GuestGuard: Redirecting from', pathname, 'to', returnTo);
        router.replace(returnTo);
      } else {
        console.log('GuestGuard: No redirect needed for path:', pathname);
      }
    }
  }, [authenticated, returnTo, router, pathname]);

  useEffect(() => {
    const timer = setTimeout(() => {
      check();
    }, 50);

    return () => clearTimeout(timer);
  }, [check]);

  return <>{children}</>;
}

Container.propTypes = {
  children: PropTypes.node,
  authenticated: PropTypes.bool,
};
