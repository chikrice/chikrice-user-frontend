// import * as Yup from 'yup';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';

import { useCheckoutContext } from './context';
import CheckoutSummary from './checkout-summary';
import LoginToProceed from '../auth/login-to-proceed';
import CheckoutBillingInfo from './checkout-billing-info';

// ----------------------------------------------------------------------

export default function CheckoutPayment() {
  const { t } = useTranslate();

  const checkout = useCheckoutContext();

  const login = useBoolean();

  return (
    <>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <CheckoutBillingInfo billing={checkout.billing} onBackStep={checkout.onBackStep} />

          <CheckoutSummary
            details={checkout?.details}
            subTotal={checkout?.subTotal}
            totalPrice={checkout?.totalPrice}
            deliveryDate={checkout?.deliveryDate}
            deliveryPrice={checkout?.deliveryPrice}
            totalDiscount={checkout?.totalDiscount}
            totalDiscountedPrice={checkout?.totalDiscountedPrice}
          />
          <Grid xs={12} md={8}>
            <Button
              sx={{ mb: 2, mt: 0.5 }}
              size="small"
              color="inherit"
              onClick={checkout.onBackStep}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              {t('back')}
            </Button>
          </Grid>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            onClick={() => checkout.onCompleteOrder()}
          >
            {t('completeOrder')}
          </LoadingButton>
        </Grid>
      </Grid>
      <LoginToProceed open={login.value} onClose={login.onFalse} returnTo={paths.checkout.root} />
    </>
  );
}
