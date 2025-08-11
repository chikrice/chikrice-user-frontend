import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import { RegisterView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {t('chikrice')} : {t('register')}
        </title>
      </Helmet>

      <RegisterView />
    </>
  );
}
