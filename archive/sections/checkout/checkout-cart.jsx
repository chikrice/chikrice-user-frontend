import { useCallback } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';

import useStore from 'src/store';
import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import { useBoolean } from 'src/hooks/use-boolean';

import { useCheckoutContext } from './context';
import CheckoutSummary from './checkout-summary';
import LoginToProceed from '../auth/login-to-proceed';

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const checkout = useCheckoutContext();
  const { t } = useTranslate();

  const { authenticated } = useStore();

  const login = useBoolean();

  const handleCheckout = useCallback(() => {
    if (authenticated) {
      checkout.onNextStep();
    } else {
      login.onTrue();
    }
  }, [authenticated, checkout, login]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <CheckoutSummary
            details={checkout?.details}
            subTotal={checkout?.subTotal}
            totalPrice={checkout?.totalPrice}
            deliveryDate={checkout?.deliveryDate}
            totalDiscount={checkout?.totalDiscount}
            deliveryPrice={checkout?.deliveryPrice}
            onApplyDiscount={checkout?.onApplyDiscount}
            totalDiscountedPrice={checkout?.totalDiscountedPrice}
          />

          <Button
            sx={{ mt: 4 }}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={handleCheckout}
          >
            {t('next')}
          </Button>
        </Grid>
      </Grid>

      <LoginToProceed open={login.value} onClose={login.onFalse} returnTo={paths.checkout.root} />
    </>
  );
}
