import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

// import Footer from './footer';
import Header from './header';
import MobileBottomNavigation from './nav/mobile/bottom-navigation';

// ----------------------------------------------------------------------

export default function MainLayout({ children }) {
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
        <MobileBottomNavigation />
      </Box>
    </>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
};
