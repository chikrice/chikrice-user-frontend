import PropTypes from 'prop-types';
import { Dialog, Stack, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';

export default function InfoDialog({ open, onClose, macros }) {
  const { t } = useTranslate();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          width: '100%',
        },
      }}
    >
      <Stack textAlign={'center'} py={4}>
        <Typography variant="h2" lineHeight={'2rem'}>
          {macros.cal.toFixed()}
        </Typography>
        <Typography variant="h5"> {t('calorie')}</Typography>
        <Stack
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 2,
            gap: 3,
            fontWeight: '500',
          }}
        >
          <small>
            {t('carb')} {macros.carb.toFixed(1)}g
          </small>
          <small>
            {t('pro')} {macros.pro.toFixed(1)}g
          </small>
          <small>
            {t('fat')} {macros.fat.toFixed(1)}g
          </small>
        </Stack>
      </Stack>
    </Dialog>
  );
}

InfoDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  macros: PropTypes.object,
};
