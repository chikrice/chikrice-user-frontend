import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import useStore from 'src/store';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const { user } = useStore();

  const goTo = user ? (user.role === 'coach' ? paths.clients : paths.dashboard) : '/';

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 26,
        height: 26,
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
        <g fill={'#E0906C'} stroke="none" strokeWidth="1">
          <ellipse cx="256" cy="256" rx="110" ry="150" />

          <rect x="230" y="400" width="50" height="65" fill={'#FFF2DF'} rx="15" />

          <circle cx="256" cy="440" r="20" fill={'#FFF2DF'} />
          <circle cx="236" cy="470" r="20" fill={'#FFF2DF'} />
          <circle cx="276" cy="470" r="20" fill={'#FFF2DF'} />
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
