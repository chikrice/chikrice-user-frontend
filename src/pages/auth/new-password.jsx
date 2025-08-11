import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import { NewPassordView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function NewPasswordPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {t('chikrice')} : {t('newPassword')}
        </title>
      </Helmet>

      <NewPassordView />
    </>
  );
}
