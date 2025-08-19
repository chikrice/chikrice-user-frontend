import { m } from 'framer-motion';
import { IconButton } from '@mui/material';

import Iconify from '../iconify';
import { varHover } from '../animate';

import type { SxProps, Theme } from '@mui/material';

// -------------------------------------

interface CustomIconButtonProps {
  icon: string;
  sx?: SxProps<Theme>;
  color?: 'success' | 'info' | 'error' | 'warning';
  width?: number;
  height?: number;
  onClick: () => void;
  [key: string]: unknown;
}

// -------------------------------------

export default function CustomIconButton({
  icon,
  onClick,
  sx,
  color,
  width = 35,
  height = 35,
  ...other
}: CustomIconButtonProps) {
  return (
    <IconButton
      color={color}
      component={m.button as React.ElementType}
      whileTap="tap"
      whileHover="hover"
      variants={varHover(1.05)}
      onClick={onClick}
      sx={{
        width,
        height,
        ...sx,
      }}
      {...other}
    >
      <Iconify icon={icon} />
    </IconButton>
  );
}
