import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';

import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

export default function AuthModernLayout({ children, image }) {
  const mdUp = useResponsive('up', 'md');

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 480,
        px: { xs: 2, md: 8 },
        display: 'flex',
        flexDirection: 'row',
        alignItems: { xs: 'center', md: 'baseline' },
      }}
    >
      <Card
        sx={{
          py: { xs: 5, md: 0 },
          px: { xs: 3, md: 0 },
          mt: { md: 15 },
          boxShadow: { md: 'none' },
          overflow: { md: 'unset' },
          bgcolor: { md: 'background.default' },
          width: '100%',
        }}
      >
        {children}
      </Card>
    </Stack>
  );

  const renderSection = (
    <Stack flexGrow={1} sx={{ position: 'relative' }}>
      <Box
        component="img"
        alt="auth"
        src={image || '/assets/background/overlay_3.jpg'}
        sx={{
          top: 16,
          left: 16,
          objectFit: 'cover',
          position: 'absolute',
          width: 'calc(100% - 32px)',
          height: 'calc(100% - 32px)',
        }}
      />
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
        position: 'relative',
        '&:before': {
          width: 1,
          height: 1,
          zIndex: -1,
          content: "''",
          position: 'absolute',
          backgroundSize: 'cover',
          opacity: { xs: 0.24, md: 0 },
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundImage: 'url(/assets/background/overlay_4.jpg)',
        },
      }}
    >
      {renderContent}

      {mdUp && renderSection}
    </Stack>
  );
}

AuthModernLayout.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
};
