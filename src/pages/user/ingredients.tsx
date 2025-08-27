import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import { UserIngredientsView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function UserIngredientsPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {t('user')}: {t('ingredients')}
        </title>
      </Helmet>

      <UserIngredientsView />
    </>
  );
}
