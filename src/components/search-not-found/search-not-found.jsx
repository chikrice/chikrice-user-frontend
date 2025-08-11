import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export default function SearchNotFound({ query, sx, ...other }) {
  const { t } = useTranslate();

  return query ? (
    <Paper
      sx={{
        bgcolor: 'unset',
        textAlign: 'center',
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h6" gutterBottom>
        {t('notFound')}
      </Typography>

      <Typography variant="body2">
        {t('noResults', { query: <strong>&quot;{query}&quot;</strong> })}
        <br /> {t('tryChecking')}
      </Typography>
    </Paper>
  ) : (
    <Typography variant="body2" sx={sx}>
      {t('enterKeywords')}
    </Typography>
  );
}

SearchNotFound.propTypes = {
  query: PropTypes.string,
  sx: PropTypes.object,
};
