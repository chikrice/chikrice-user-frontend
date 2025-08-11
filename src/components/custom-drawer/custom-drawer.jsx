import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { Box, SwipeableDrawer } from '@mui/material';

export default function CustomBottomDrawer({
  children,
  open,
  onOpen,
  onClose,
  height = 'auto',
  sx,
  ...other
}) {
  const theme = useTheme();

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
      <StyledDrawerCloseBar></StyledDrawerCloseBar>
      {children}
    </SwipeableDrawer>
  );
}

CustomBottomDrawer.propTypes = {
  children: PropTypes.node,
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  height: PropTypes?.string,
  sx: PropTypes.object,
};

const StyledDrawerCloseBar = styled(Box)(({ theme }) => ({
  height: '4px',
  width: '60px',
  borderRadius: '8px',
  backgroundColor: theme.palette.grey[400],
  marginTop: 2,
  position: 'absolute',
  top: 8,
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 999,
}));
