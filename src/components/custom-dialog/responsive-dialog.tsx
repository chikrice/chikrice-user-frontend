import { ReactNode } from 'react';
import { Dialog, DialogContent } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';
import CustomBottomDrawer from 'src/components/custom-drawer';

import type { SxProps } from '@mui/material';

interface ResponsiveDialogProps {
  children: ReactNode;
  open: boolean;
  onOpen?: () => void;
  onClose: () => void;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  fullWidth?: boolean;
  sx?: SxProps;
  disableBackdrop?: boolean;
}

export default function ResponsiveDialog({
  children,
  open,
  onOpen,
  onClose,
  maxWidth = 'sm',
  fullWidth = true,
  sx,
  disableBackdrop = false,
  ...other
}: ResponsiveDialogProps) {
  const isDesktop = useResponsive('up', 'md');

  if (isDesktop) {
    return (
      <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={onClose} sx={sx} {...other}>
        <DialogContent sx={{ pt: 2, pb: 3 }}>{children}</DialogContent>
      </Dialog>
    );
  }

  return (
    <CustomBottomDrawer
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      disableBackdrop={disableBackdrop}
      sx={sx}
      {...other}
    >
      {children}
    </CustomBottomDrawer>
  );
}
