import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import { ResetPasswordSuccessView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function ResetPasswordSuccessPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>{t('chikrice')} : Reset Password Email Sent</title>
      </Helmet>

      <ResetPasswordSuccessView />
    </>
  );
}
