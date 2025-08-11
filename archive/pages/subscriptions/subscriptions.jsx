import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import SubscriptionsView from 'src/sections/subscriptions/view';

// ----------------------------------------------------------------------

export default function SubscriptionsPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>chikrice : {t('subscription')}</title>
      </Helmet>

      <SubscriptionsView />
    </>
  );
}
