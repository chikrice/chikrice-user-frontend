import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import ComingSoonView from 'src/sections/coming-soon/view';

// ----------------------------------------------------------------------

export default function ComingSoonPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title> {t('comingSoon')}</title>
      </Helmet>

      <ComingSoonView />
    </>
  );
}
