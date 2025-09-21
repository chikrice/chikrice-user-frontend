import { ReactNode } from 'react';
import { Dialog, DialogContent, DialogActions } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';
import CustomBottomDrawer from 'src/components/custom-drawer';

import type { SxProps } from '@mui/material';

interface ResponsiveDialogProps {
  children: ReactNode;
  open: boolean;
  onOpen?: () => void;
  onClose: () => void;
  title?: string;
  actions?: ReactNode;
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
  actions,
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
        <DialogContent sx={{ pt: 2 }}>{children}</DialogContent>
        {actions && <DialogActions>{actions}</DialogActions>}
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
