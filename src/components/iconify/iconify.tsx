import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { Icon } from '@iconify/react';

import type { SxProps, Theme } from '@mui/material';

// -------------------------------------

interface IconifyProps {
  icon: string;
  width?: number;
  sx?: SxProps<Theme>;
  [key: string]: unknown;
}

// -------------------------------------

const Iconify = forwardRef(({ icon, width = 20, sx, ...other }: IconifyProps, ref) => (
  <Box
    ref={ref}
    component={Icon}
    className="component-iconify"
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
));

export default Iconify;
