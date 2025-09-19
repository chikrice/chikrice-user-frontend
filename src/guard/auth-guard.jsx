import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

import useStore from 'src/store';
import { paths } from 'src/routes/paths';
import { router } from 'src/routes/navigation';
import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  const isAuthLoading = useStore((state) => state.isAuthLoading);
  const authenticated = useStore((state) => state.authenticated);

  return (
    <>{isAuthLoading ? <SplashScreen /> : <Container authenticated={authenticated}> {children}</Container>}</>
  );
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

function Container({ children, authenticated }) {
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      console.log('this is me redirecting hahahah');
      router.replace(paths.home);
    } else {
      setChecked(true);
    }
  }, [authenticated]);

  useEffect(() => {
    let timerId = setTimeout(() => {
      check();
    }, 50);

    return () => clearTimeout(timerId);
  }, [check]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}

Container.propTypes = {
  children: PropTypes.node,
  authenticated: PropTypes.bool,
};
