import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Container, Stack } from '@mui/material';

import Footer from './footer';
import Header from './header';

// ----------------------------------------------------------------------

export default function HomeLayout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Header />

      <Container component="main">
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
      </Container>

      <Footer />
    </Box>
  );
}

HomeLayout.propTypes = {
  children: PropTypes.node,
};
