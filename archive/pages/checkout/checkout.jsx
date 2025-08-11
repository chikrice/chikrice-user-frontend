import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import { CheckoutView } from 'src/sections/checkout/view';

// ----------------------------------------------------------------------

export default function CheckoutPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>{t('checkout')}</title>
      </Helmet>

      <CheckoutView />
    </>
  );
}
