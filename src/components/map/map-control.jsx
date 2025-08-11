import PropTypes from 'prop-types';
import { ScaleControl, GeolocateControl, NavigationControl } from 'react-map-gl';

import { StyledMapControls } from './styles';

// ----------------------------------------------------------------------

export default function MapControl({
  hideScaleControl,
  hideGeolocateControl,
  hideNavigationnControl,
}) {
  return (
    <>
      <StyledMapControls />

      {!hideGeolocateControl && (
        <GeolocateControl position="top-right" positionOptions={{ enableHighAccuracy: true }} />
      )}

      {!hideScaleControl && <ScaleControl position="bottom-left" />}

      {!hideNavigationnControl && <NavigationControl position="bottom-left" />}
    </>
  );
}

MapControl.propTypes = {
  hideGeolocateControl: PropTypes.bool,
  hideNavigationnControl: PropTypes.bool,
  hideScaleControl: PropTypes.bool,
};
