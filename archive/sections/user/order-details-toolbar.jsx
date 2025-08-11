import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { fDateTime } from 'src/utils/format-time';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export default function OrderDetailsToolbar({ status, backLink, orderDate, orderNumber }) {
  const { t } = useTranslate();

  return (
    <>
      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <Stack spacing={1} direction="row" alignItems="flex-start">
          <IconButton component={RouterLink} href={backLink}>
            <Iconify icon="eva:arrow-ios-back-fill" />
          </IconButton>

          <Stack spacing={0.5}>
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography variant="h4">
                {t('order')} #{orderNumber}
              </Typography>
              <Label
                variant="soft"
                color={
                  (status === 'completed' && 'success') ||
                  (status === 'processing' && 'primary') ||
                  (status === 'pending' && 'warning') ||
                  (status === 'cancelled' && 'error') ||
                  'default'
                }
              >
                {t(status)}
              </Label>
            </Stack>

            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              {fDateTime(orderDate)}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          flexGrow={1}
          spacing={1.5}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button
            color="inherit"
            variant="outlined"
            startIcon={<Iconify icon="solar:printer-minimalistic-bold" />}
          >
            {t('print')}
          </Button>
        </Stack>
      </Stack>
    </>
  );
}

OrderDetailsToolbar.propTypes = {
  backLink: PropTypes.string,
  orderDate: PropTypes.string,
  onChangeStatus: PropTypes.func,
  orderNumber: PropTypes.number,
  status: PropTypes.string,
  statusOptions: PropTypes.array,
};
