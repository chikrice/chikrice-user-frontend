import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import { LoginView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function LoginPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {t('chikrice')} : {t('login')}
        </title>
      </Helmet>

      <LoginView />
    </>
  );
}
