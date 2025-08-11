import { useCallback } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';

import { Address } from '../address';
import { useCheckoutContext } from './context';

// ----------------------------------------------------------------------

export default function CheckoutBillingAddress() {
  const checkout = useCheckoutContext();
  const { t } = useTranslate();

  const handleDeliverToAddress = useCallback(
    (address) => {
      checkout.onCreateBilling(address);
    },
    [checkout]
  );

  return (
    <>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <Button
              size="small"
              color="inherit"
              onClick={checkout.onBackStep}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              {t('back')}
            </Button>
          </Stack>
        </Grid>
      </Grid>

      {/* add var to  */}
      <Address actionType="deliver" onDeliverToAddress={handleDeliverToAddress} />
    </>
  );
}
