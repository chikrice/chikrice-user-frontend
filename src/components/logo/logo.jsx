import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material';

import useStore from 'src/store';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const user = useStore((state) => state.user);
  const theme = useTheme();
  const goTo = user ? (user.role === 'coach' ? paths.clients : paths.dashboard) : '/';

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 34,
        height: 34,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <svg
        style={{ transform: 'rotate(25deg)' }}
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 512 512"
      >
        <g fill={theme.palette.primary.dark} stroke="none" strokeWidth="1">
          <ellipse cx="256" cy="256" rx="110" ry="150" />

          <rect x="230" y="400" width="50" height="65" fill={theme.palette.primary.main} rx="15" />

          <circle cx="256" cy="440" r="20" fill={theme.palette.primary.main} />
          <circle cx="236" cy="470" r="20" fill={theme.palette.primary.main} />
          <circle cx="276" cy="470" r="20" fill={theme.palette.primary.main} />
        </g>
      </svg>
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href={goTo} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
