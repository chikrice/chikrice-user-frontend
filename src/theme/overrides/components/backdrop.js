import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export function backdrop(theme) {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[900], 0.5),
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
  };
}
