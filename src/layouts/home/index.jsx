import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';

import Footer from './footer';
import Header from './header';

// ----------------------------------------------------------------------

export default function HomeLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header />

      <main>
        <Stack
          sx={{
            m: 'auto',
            // maxWidth: 400,
            minHeight: '100vh',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Stack>
      </main>

      <Footer />
    </Box>
  );
}

HomeLayout.propTypes = {
  children: PropTypes.node,
};
