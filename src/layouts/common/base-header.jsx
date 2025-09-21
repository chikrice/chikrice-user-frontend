import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

import { useOffSetTop } from 'src/hooks/use-off-set-top';

import { HEADER } from '../config-layout';
import HeaderShadow from './header-shadow';

export default function BaseHeader({ children }) {
  const theme = useTheme();
  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          minHeight: {
            xs: HEADER.H_MOBILE,
          },
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Box sx={{ height: 1, display: 'flex', alignItems: 'center', width: '100%', p: 2 }}>{children}</Box>
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}

BaseHeader.propTypes = {
  children: PropTypes.node,
};
