import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import Header from './header';

// ----------------------------------------------------------------------

export default function CoachLayout({ children }) {
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
        <Header />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflowY: 'scroll',
            ...{
              pt: { xs: 6.5, md: 10 },
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}

CoachLayout.propTypes = {
  children: PropTypes.node,
};
