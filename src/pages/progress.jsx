import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import ProgressView from 'src/sections/progress/view';

// ----------------------------------------------------------------------

export default function ProgressPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>chikrice : {t('progress')}</title>
      </Helmet>

      <ProgressView />
    </>
  );
}
