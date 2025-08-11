import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import { UserAccountView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function UserAccountPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {t('user')}: {t('profile')}
        </title>
      </Helmet>

      <UserAccountView />
    </>
  );
}
