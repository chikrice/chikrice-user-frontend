import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import { UserSettingsView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function SettingsPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {' '}
          {t('orders')}: {t('details')}
        </title>
      </Helmet>

      <UserSettingsView />
    </>
  );
}
