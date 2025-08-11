import PropTypes from 'prop-types';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export default function LoginButton({ sx }) {
  const { t } = useTranslate();

  return (
    <Button
      component={RouterLink}
      href={paths.auth.login}
      variant="contained"
      size="small"
      sx={{ mr: 1, ...sx }}
    >
      {t('login')}
    </Button>
  );
}

LoginButton.propTypes = {
  sx: PropTypes.object,
};
