import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';

import Iconify from 'src/components/iconify'; // You can replace this with any icon you like
export default function CircleButton({ icon, sx, width = 48, onClick, ...other }) {
  return (
    <IconButton
      sx={{
        width: width,
        height: width,
        borderRadius: '50%',
        backgroundColor: 'primary.main',
        color: 'white',
        '&:hover': {
          backgroundColor: 'primary.dark',
        },
        ...sx,
      }}
      {...other}
      onClick={onClick}
    >
      <Iconify icon={icon} /> {/* Replace with your desired icon */}
    </IconButton>
  );
}

CircleButton.propTypes = {
  icon: PropTypes.string,
  sx: PropTypes.object,
  width: PropTypes.number,
  onClick: PropTypes.func,
};
