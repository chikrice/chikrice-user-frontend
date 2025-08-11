import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import { UserOrdersView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function ShopPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {' '}
          {t('orders')}: {t('list')}
        </title>
      </Helmet>

      <UserOrdersView />
    </>
  );
}
