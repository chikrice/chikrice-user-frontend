import PropTypes from 'prop-types';
import { InputBase, styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';

const StyledSearchbar = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '22px',
  backgroundColor: theme.palette.card.default, // Apply background color correctly
  padding: theme.spacing(0.5, 1),
  width: '100%',
  marginTop: 2,
}));

export default function Searchbar({ onClose }) {
  return (
    <StyledSearchbar>
      <IconButton onClick={onClose} size="small">
        <Iconify icon="ion:arrow-back-outline" />
      </IconButton>
      <InputBase
        placeholder="Search…"
        sx={{ ml: 1, flex: 1, fontSize: '0.875rem' }} // Small font size
        inputProps={{ 'aria-label': 'search' }}
      />
    </StyledSearchbar>
  );
}

Searchbar.propTypes = {
  onClose: PropTypes.func,
};
