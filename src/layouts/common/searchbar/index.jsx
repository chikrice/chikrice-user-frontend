import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
import { memo, useState, useCallback } from 'react';
// import { useRouter } from 'src/routes/hooks';
// import { useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useTranslate } from 'src/locales';
// import { endpoints } from 'src/utils/axios';
// import { useGetGroups } from 'src/api/category';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { useEventListener } from 'src/hooks/use-event-listener';

// import { applyFilter, getAllItems } from './utils';

// ----------------------------------------------------------------------

function Searchbar({ sx, placeholder }) {
  // const theme = useTheme();

  // const router = useRouter();

  const search = useBoolean();
  const { t } = useTranslate();
  // const { groups } = useGetGroups();

  const [searchQuery, setSearchQuery] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'k' && event.metaKey) {
      search.onToggle();
      setSearchQuery('');
    }
  };

  useEventListener('keydown', handleKeyDown);

  const handleSearch = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  return (
    <>
      <Stack sx={{ px: 0.5, ...sx }}>
        <TextField
          fullWidth
          variant="filled"
          multiline
          placeholder={t(placeholder ? placeholder : 'search')}
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Iconify icon="eva:search-fill" width={24} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
            disableUnderline: true, // This helps to make the input look cleaner with filled variant
          }}
          sx={{
            '& .MuiFilledInput-root': {
              borderRadius: '22px',
              backgroundColor: (theme) => theme.palette.card.default,
              padding: '12px',
              alignItems: 'center',
            },
            '& .MuiFilledInput-input': {
              padding: 0.5, // Remove extra padding inside the input field
            },

            '& .MuiInputAdornment-root': {
              marginRight: '8px',
            },
          }}
        />
      </Stack>
    </>
  );
}
Searchbar.propTypes = {
  sx: PropTypes.object,
  placeholder: PropTypes.string,
};

export default memo(Searchbar);
