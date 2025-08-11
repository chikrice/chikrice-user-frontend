import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';

import Iconify from '../iconify';

// ----------------------------------------------------------------------

export function LeftIcon({ icon = 'eva:arrow-ios-forward-fill', width, ...other }) {
  const theme = useTheme();

  const isRTL = theme.direction === 'rtl';

  return (
    <Iconify
      icon={icon}
      width={width}
      {...other}
      sx={{
        transform: ' scaleX(-1)',
        ...(isRTL && {
          transform: ' scaleX(1)',
        }),
        cursor: 'pointer',
      }}
    />
  );
}

LeftIcon.propTypes = {
  icon: PropTypes.string,
  isRTL: PropTypes.bool,
  width: PropTypes.number,
};

export function RightIcon({ icon = 'eva:arrow-ios-forward-fill', width, ...other }) {
  const theme = useTheme();

  const isRTL = theme.direction === 'rtl';
  return (
    <Iconify
      icon={icon}
      width={width}
      {...other}
      sx={{
        ...(isRTL && {
          transform: ' scaleX(-1)',
        }),
        cursor: 'pointer',
      }}
    />
  );
}

RightIcon.propTypes = {
  icon: PropTypes.string,
  isRTL: PropTypes.bool,
  width: PropTypes.number,
};
