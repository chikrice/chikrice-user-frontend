import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';

import Iconify from '../iconify';
import { varHover } from '../animate';

export default function CustomIconButton({
  icon,
  onClick,
  sx,
  color,
  width = 35,
  height = 35,
  ...other
}) {
  return (
    <IconButton
      color={color}
      component={m.button}
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

CustomIconButton.propTypes = {
  sx: PropTypes.object,
  icon: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(['success', 'info', 'error', 'warning', undefined]),
};
