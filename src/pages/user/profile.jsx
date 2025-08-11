import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import { UserProfileView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function UserPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {t('user')}: {t('profile')}
        </title>
      </Helmet>

      <UserProfileView />
    </>
  );
}
