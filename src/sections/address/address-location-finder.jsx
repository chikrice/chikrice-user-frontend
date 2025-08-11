import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import Map, { Marker } from 'react-map-gl';
import { Box, Button } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useState, useEffect, useCallback } from 'react';

import config from 'src/config-global';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')({
  // background: 'black',
  zIndex: 1999,
  left: 0,
  top: 0,
  height: '100svh',
  width: '100svw',
  overflow: 'hidden',
  position: 'fixed',
  '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
    display: 'none',
  },
});

const StyledLocateButton = styled(Button)({
  direction: 'ltr',
  position: 'absolute',
  right: '5%',
  bottom: 'calc(5% + 70px)',
  backgroundColor: '#ffffff',
  color: '#000000',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: '#f5f5f5',
  },
});

const StyledConfirmButton = styled(Button)({
  position: 'absolute',
  bottom: '5%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '90%',
});

// ----------------------------------------------------------------------

export default function AddressMap({ onConfirm }) {
  const theme = useTheme();
  const lightMode = theme.palette.mode === 'light';

  const [userLocation, setUserLocation] = useState({
    latitude: 12,
    longitude: 42,
  });

  const [viewState, setViewState] = useState({
    latitude: 12,
    longitude: 42,
    zoom: 14,
  });

  const [isLocationLoaded, setIsLocationLoaded] = useState(false);

  const locateUser = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setUserLocation({
          latitude: latitude,
          longitude: longitude,
        });
        updateViewState(latitude, longitude);

        setIsLocationLoaded(true);
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  };

  const updateViewState = useCallback(
    (latitude, longitude) => {
      setViewState({
        latitude,
        longitude,
        zoom: 14,
      });

      setTimeout(() => {
        setViewState(null);
      }, 100);
    },
    [setViewState]
  );

  // Create the debounced function
  const debouncedUpdateLocation = debounce((latitude, longitude) => {
    setUserLocation({
      latitude,
      longitude,
    });
    // update the fullAddress and mapLink here baby
  }, 10);

  const handleMove = useCallback(
    (e) => {
      const { latitude, longitude } = e.viewState;
      debouncedUpdateLocation(latitude, longitude);
    },
    [debouncedUpdateLocation]
  );

  const handleConfirm = useCallback(() => {
    onConfirm(userLocation);
  }, [userLocation, onConfirm]);

  useEffect(() => {
    locateUser();
    // eslint-disable-next-line
  }, []);

  return (
    <StyledRoot>
      <Box
        sx={{
          height: '100%',
          width: '100%',
          background: (theme) => theme.palette.background.default,
        }}
      >
        <Map
          initialViewState={viewState}
          viewState={viewState}
          mapStyle={`mapbox://styles/mapbox/${lightMode ? 'light' : 'dark'}-v10`}
          mapboxAccessToken={config.mapboxApiKey}
          onMove={handleMove}
        >
          {isLocationLoaded && (
            <Marker
              latitude={userLocation.latitude}
              longitude={userLocation.longitude}
              color="red"
            />
          )}
        </Map>

        <StyledLocateButton
          variant="soft"
          endIcon={<Iconify icon="fluent:location-48-filled" />}
          onClick={locateUser}
        >
          Locate Me
        </StyledLocateButton>

        <StyledConfirmButton variant="contained" size="large" onClick={handleConfirm}>
          Confirm
        </StyledConfirmButton>
      </Box>
    </StyledRoot>
  );
}

AddressMap.propTypes = {
  onConfirm: PropTypes.func,
};
