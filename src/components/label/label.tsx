import Box from '@mui/material/Box';
import { forwardRef, ReactNode } from 'react';
import { useTheme } from '@mui/material/styles';
import { SxProps, Theme } from '@mui/material/styles';

import type { LabelVariant, LabelColor } from './styles';

import { StyledLabel } from './styles';

// ----------------------------------------------------------------------

export interface LabelProps {
  children?: ReactNode;
  color?: LabelColor;
  variant?: LabelVariant;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  sx?: SxProps<Theme>;
}

const Label = forwardRef<HTMLSpanElement, LabelProps>(
  ({ children, color = 'default', variant = 'soft', startIcon, endIcon, sx, ...other }, ref) => {
    const theme = useTheme();

    const iconStyles = {
      width: 16,
      height: 16,
      '& svg, img': { width: 1, height: 1, objectFit: 'cover' },
    };

    return (
      <StyledLabel
        ref={ref}
        component="span"
        ownerState={{ color, variant }}
        sx={{
          ...(startIcon && { pl: 0.75 }),
          ...(endIcon && { pr: 0.75 }),
          ...sx,
        }}
        theme={theme}
        {...other}
      >
        {startIcon && <Box sx={{ mr: 0.75, ...iconStyles }}> {startIcon} </Box>}

        {children}

        {endIcon && <Box sx={{ ml: 0.75, ...iconStyles }}> {endIcon} </Box>}
      </StyledLabel>
    );
  }
);

Label.displayName = 'Label';

export default Label;
