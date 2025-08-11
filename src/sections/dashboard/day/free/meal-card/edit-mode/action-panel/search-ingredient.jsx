import PropTypes from 'prop-types';
import { InputAdornment, TextField } from '@mui/material';

import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';

export default function SearchIngredient({ searchQuery, setSearchQuery, isLoading }) {
  const { t } = useTranslate();
  return (
    <div>
      <TextField
        size="small"
        variant="filled"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={inputStyles}
        placeholder={t('search')}
        InputProps={{
          startAdornment: (
            <InputAdornment style={{ marginTop: 0 }} position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
          endAdornment: <>{isLoading ? <Iconify icon="svg-spinners:8-dots-rotate" /> : null}</>,
        }}
      />
    </div>
  );
}

SearchIngredient.propTypes = {
  isLoading: PropTypes.bool,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
};

const inputStyles = {
  '& .MuiFilledInput-input': {
    width: '35svw',
    pt: '10px',
    pb: '8px',
    pr: 0,
  },
  '& .MuiFilledInput-root': {
    borderRadius: '20px',
    overflow: 'hidden',
  },
};

/**
 * what should I do today?
 * 1. let's fix all bugs and make the app run smoothly
 * 2. try to make it work on phone if you can
 *
 * // start
 * go as a use would go and fix thing as they appear
 */
