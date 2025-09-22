import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

import { SettingsDrawer } from 'src/components/settings';
import { useResponsive } from 'src/hooks/use-responsive';

// import Footer from './footer';
import Header from './header';
import Sidebar from './sidebar';
import MobileBottomNavigation from './bottom-navigation';

// ----------------------------------------------------------------------

export default function MainLayout({ children }) {
  const isMdUp = useResponsive('up', 'md');

  return (
    <>
      <Box sx={{ display: 'flex', height: 1 }}>
        {isMdUp && <Sidebar />}

        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: 1, maxWidth: '100vw' }}>
          <Header />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              overflowY: 'scroll',
              ...{
                pt: { xs: 6.5, md: 8 },
              },
            }}
          >
            {children}
          </Box>
          {!isMdUp && <MobileBottomNavigation />}
        </Box>
      </Box>
      <SettingsDrawer />
    </>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node,
};
