import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import { CoachListView } from 'src/sections/coach/view';

// ----------------------------------------------------------------------

export default function CoachListPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>chikrice : {t('clients')}</title>
      </Helmet>

      <CoachListView />
    </>
  );
}
