import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Box, SwipeableDrawer } from '@mui/material';

import type { SxProps, Theme } from '@mui/material';

interface ExtendedTheme extends Theme {
  customShadows: {
    [key: string]: string;
  };
}

interface CustomBottomDrawerProps {
  children: ReactNode;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  height?: string;
  sx?: SxProps<Theme>;
}

export default function CustomBottomDrawer({
  children,
  open,
  onOpen,
  onClose,
  height = 'auto',
  sx,
  ...other
}: CustomBottomDrawerProps) {
  const theme = useTheme() as ExtendedTheme;

  return (
    <SwipeableDrawer
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      disableSwipeToOpen={true}
      anchor="bottom"
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
    >
      <StyledDrawerCloseBar />
      {children}
    </SwipeableDrawer>
  );
}

const StyledDrawerCloseBar = styled(Box)(({ theme }: { theme?: ExtendedTheme }) => ({
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
