import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import { View403 } from 'src/sections/error';

// ----------------------------------------------------------------------

export default function Page403() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title> 403 {t('forbidden')}</title>
      </Helmet>

      <View403 />
    </>
  );
}
