import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import { UserPlanCustomizationView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function ShopPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {t('user')}: {t('planCustomization')}
        </title>
      </Helmet>

      <UserPlanCustomizationView />
    </>
  );
}
