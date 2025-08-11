import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import DashboardView from 'src/sections/dashboard/view';

// ----------------------------------------------------------------------

export default function DashboardPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>chikrice : {t('dashboard')}</title>
      </Helmet>

      <DashboardView />
    </>
  );
}
