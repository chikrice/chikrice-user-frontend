import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import { CoachProfileView } from 'src/sections/coach/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {t('coach')}: {t('profile')}
        </title>
      </Helmet>

      <CoachProfileView />
    </>
  );
}
