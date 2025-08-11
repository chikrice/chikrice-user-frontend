import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import { CoachClientView } from 'src/sections/coach/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {t('coach')}: {t('client')}
        </title>
      </Helmet>

      <CoachClientView />
    </>
  );
}
