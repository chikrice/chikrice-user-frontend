import { useTheme } from '@mui/material/styles';

import Iconify from '../iconify';

// -------------------------------------

interface LeftIconProps {
  icon?: string;
  width?: number;
  [key: string]: unknown;
}

export function LeftIcon({ icon = 'eva:arrow-ios-forward-fill', width, ...other }: LeftIconProps) {
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

interface RightIconProps {
  icon?: string;
  width?: number;
  [key: string]: unknown;
}

export function RightIcon({ icon = 'eva:arrow-ios-forward-fill', width = 24, ...other }: RightIconProps) {
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
