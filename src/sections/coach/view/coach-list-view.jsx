//import PropTypes from 'prop-types';

import { useState } from 'react';
import { Box, Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';

import Iconify from 'src/components/iconify';
import { useGetCoaches } from 'src/api/coach';
import Searchbar from 'src/layouts/common/searchbar';
import { LoadingScreen } from 'src/components/loading-screen';

import CoachListItem from '../coach-list-item';

export default function CoachListView() {
  const { coaches, isLoading, error } = useGetCoaches();
  console.log('🚀 ~ CoachListView ~ coaches:', coaches);

  const [view, setView] = useState('full');

  const handleViewChange = (event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  if (isLoading) return <LoadingScreen />;
  if (error) return <div>error</div>;

  return (
    <Box>
      <Stack
        px={{ xs: 2, md: 3 }}
        flexDirection={'row'}
        sx={{
          position: 'sticky',
          top: '-50px',
          zIndex: 2000,
          bgcolor: (theme) => theme.palette.background.default,
          py: 1,
        }}
      >
        <Searchbar placeholder="searchCoach" sx={{ width: '100%' }} />
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          aria-label="view toggle"
          sx={{ border: 'none', width: 'fit-content', bgcolor: 'transparent' }}
        >
          <ToggleButton value={'compact'} aria-label="view compact">
            <Iconify icon="mingcute:grid-fill" />
          </ToggleButton>
          <ToggleButton value={'full'} aria-label="view compact">
            <Iconify icon="tabler:layout-list-filled" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Stack spacing={2} mt={1}>
        {coaches.map((coach, index) => (
          <CoachListItem key={index} view={view} coach={coach} />
        ))}
      </Stack>
    </Box>
  );
}

//ClientsView.propTypes = {}
