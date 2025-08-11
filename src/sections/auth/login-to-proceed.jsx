import PropTypes from 'prop-types';
import { useCallback } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import { useRouter } from 'src/routes/hooks';

export default function LoginToProceed({ open, onClose, returnTo }) {
  const router = useRouter();
  const { t } = useTranslate();

  const handleLoginRedirect = useCallback(() => {
    const path = `${paths.auth.login}?returnTo=${returnTo}`;
    router.push(path);
  }, [router, returnTo]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle> {t('loginToProceed')} </DialogTitle>

      <DialogActions>
        <Button
          sx={{ width: 250 }}
          size="large"
          color="inherit"
          variant="contained"
          onClick={handleLoginRedirect}
        >
          {t('login')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

LoginToProceed.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  returnTo: PropTypes.string,
};
