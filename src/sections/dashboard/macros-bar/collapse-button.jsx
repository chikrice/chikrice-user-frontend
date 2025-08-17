import PropTypes from 'prop-types';
import { IconButton, Stack } from '@mui/material';

import Iconify from 'src/components/iconify';

export function MacrosBarCollapseBtn({ isIn, onClick }) {
  return (
    <Stack
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 16,
      }}
    >
      <IconButton color="primary" onClick={onClick}>
        <Iconify icon={isIn ? 'icon-park-outline:up' : 'icon-park-outline:down'} />
      </IconButton>
    </Stack>
  );
}

MacrosBarCollapseBtn.propTypes = {
  isIn: PropTypes.bool,
  onClick: PropTypes.func,
};
