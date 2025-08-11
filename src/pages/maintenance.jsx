import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import MaintenanceView from 'src/sections/maintenance/view';

// ----------------------------------------------------------------------

export default function MaintenancePage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>{t('maintenance')}</title>
      </Helmet>

      <MaintenanceView />
    </>
  );
}
