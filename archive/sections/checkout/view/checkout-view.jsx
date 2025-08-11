import { useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { useTranslate } from 'src/locales';
import { useRouter } from 'src/routes/hooks';
import { useSettingsContext } from 'src/components/settings';

import CheckoutCart from '../checkout-cart';
import CheckoutSteps from '../checkout-steps';
import { useCheckoutContext } from '../context';
import CheckoutPayment from '../checkout-payment';
import CheckoutOrderComplete from '../checkout-order-complete';
import CheckoutBillingAddress from '../checkout-billing-address';

// ----------------------------------------------------------------------

export default function CheckoutView() {
  const settings = useSettingsContext();
  const { t } = useTranslate();
  const router = useRouter();
  const PRODUCT_CHECKOUT_STEPS = [t('orderSummary'), t('address'), t('payment')];

  const checkout = useCheckoutContext();

  useEffect(() => {
    const { daysCount } = checkout.details;
    if (!daysCount) {
      router.replace('/');
    }
  }, [checkout, router]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ mb: 10 }}>
      <Grid container justifyContent={checkout.completed ? 'center' : 'flex-start'}>
        <Grid xs={12} md={8}>
          <CheckoutSteps activeStep={checkout.activeStep} steps={PRODUCT_CHECKOUT_STEPS} />
        </Grid>
      </Grid>

      {checkout.completed ? (
        <CheckoutOrderComplete
          open={checkout.completed}
          onReset={checkout.onReset}
          onDownloadPDF={() => {}}
        />
      ) : (
        <>
          {checkout.activeStep === 0 && <CheckoutCart />}

          {checkout.activeStep === 1 && <CheckoutBillingAddress />}

          {checkout.activeStep === 2 && checkout.billing && <CheckoutPayment />}
        </>
      )}
    </Container>
  );
}
