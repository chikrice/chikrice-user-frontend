import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import { ForgotPassordView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function ForgotPasswordPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {t('jojooshop')} : {t('forgotPassword')}
        </title>
      </Helmet>

      <ForgotPassordView />
    </>
  );
}
