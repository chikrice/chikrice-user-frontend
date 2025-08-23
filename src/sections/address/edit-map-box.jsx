import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Map, Marker } from 'react-map-gl';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

import config from 'src/config-global';

export default function EditMapBox({ latitude, longitude, onClick }) {
  const theme = useTheme();
  const lightMode = theme.palette.mode === 'light';

  const viewState = useMemo(
    () => ({
      latitude,
      longitude,
      zoom: 12,
    }),
    [latitude, longitude]
  );

  return (
    <Box
      onClick={onClick}
      sx={{
        minWidth: 80,
        height: 80,
        borderRadius: 2,
        overflow: 'hidden',
        border: (theme) => `dashed 1px ${theme.palette.divider}`,
        position: 'relative',
      }}
    >
      <Map
        viewState={viewState}
        mapStyle={`mapbox://styles/mapbox/${lightMode ? 'light' : 'dark'}-v10`}
        mapboxAccessToken={config.mapboxApiKey}
      >
        <Marker latitude={viewState.latitude} longitude={viewState.longitude} color="red" />
      </Map>

      <Box
        sx={{
          position: 'absolute',
          backgroundColor: (theme) => theme.palette.info.main,
          bottom: 0,
          left: 0,
          width: '100%',
          height: '25px',
          display: 'flex',
          zIndex: 10000,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="subtitle2" color={'white'}>
          edit
        </Typography>
      </Box>
    </Box>
  );
}

EditMapBox.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
  onClick: PropTypes.func,
};
