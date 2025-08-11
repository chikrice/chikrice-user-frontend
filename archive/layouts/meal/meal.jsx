import PropTypes from 'prop-types';
import { Box, IconButton } from '@mui/material';

import { useRouter } from 'src/routes/hooks';
import { LeftIcon } from 'src/components/carousel/arrow-icons';

export default function MealLayout({ children }) {
  const router = useRouter();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflowY: 'scroll',
        }}
      >
        {/* back button */}
        <IconButton sx={{ position: 'absolute', left: 10, top: 10 }} onClick={() => router.back()}>
          <LeftIcon width={30} />
        </IconButton>
        {children}
      </Box>
    </Box>
  );
}

MealLayout.propTypes = { children: PropTypes.node };
