import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@mui/material/styles';
import { Box, SwipeableDrawer } from '@mui/material';

import type { Theme } from 'src/theme';

import type { SxProps } from '@mui/material';

interface CustomBottomDrawerProps {
  children: ReactNode;
  open: boolean;
  onOpen?: () => void;
  onClose: () => void;
  height?: string;
  sx?: SxProps<Theme>;
  disableBackdrop?: boolean;
}

export default function CustomBottomDrawer({
  children,
  open,
  onOpen,
  onClose,
  height = 'auto',
  sx,
  disableBackdrop = false,
  ...other
}: CustomBottomDrawerProps) {
  const theme = useTheme();

  return (
    <SwipeableDrawer
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      disableSwipeToOpen={true}
      anchor="bottom"
      variant={disableBackdrop ? 'persistent' : 'temporary'}
      {...other}
      PaperProps={{
        sx: {
          '&.MuiDrawer-paper': {
            backdropFilter: 'none !important',
            backgroundImage: 'none !important',
            backgroundColor: `${theme.palette.background.default} !important`,
            borderRadius: '30px',
            bottom: 6,
            boxShadow: theme.customShadows.bottomNav,
          },
          minHeight: '200px',
          maxHeight: '90vh',
          height,
          py: 4,
          overflow: 'auto',
          ...sx,
        },
      }}
      sx={{
        ...sx,
        ...(disableBackdrop && {
          '& .MuiBackdrop-root': {
            backgroundColor: 'transparent !important',
            pointerEvents: 'none !important',
          },
        }),
      }}
    >
      <StyledDrawerCloseBar />
      {children}
    </SwipeableDrawer>
  );
}

const StyledDrawerCloseBar = styled(Box)(({ theme }: { theme?: Theme }) => ({
  height: '4px',
  width: '60px',
  borderRadius: '8px',
  backgroundColor: theme.palette.grey[400],
  marginTop: 2,
  position: 'absolute' as const,
  top: 8,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 999,
}));
