import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';

import useStore from 'src/store';
import { SplashScreen } from 'src/components/loading-screen';
import { useRouter, useSearchParams } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function CoachGuard({ children }) {
  const { loading } = useStore();

  return <>{loading ? <SplashScreen /> : <Container> {children}</Container>}</>;
}

CoachGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

function Container({ children }) {
  const router = useRouter();

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo') || '/dashboard';

  const { user } = useStore();

  const check = useCallback(() => {
    if (user?.role !== 'coach') {
      router.replace(returnTo);
    }
  }, [user, returnTo, router]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}

Container.propTypes = {
  children: PropTypes.node,
};
