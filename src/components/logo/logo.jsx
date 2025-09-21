import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import useStore from 'src/store';
import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import logoDark from 'src/assets/images/logo-dark.png';
import logoLight from 'src/assets/images/logo-light.png';
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ sx, ...other }, ref) => {
  const isAuthenticated = useStore((state) => state.authenticated);

  const href = isAuthenticated ? paths.dashboard : paths.home;
  const { themeMode } = useSettingsContext();

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <Image src={themeMode === 'light' ? logoLight : logoDark} alt="logo" width={100} sx={{ scale: 1.6 }} />
    </Box>
  );

  return (
    <Link component={RouterLink} href={href} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
};

export default Logo;
