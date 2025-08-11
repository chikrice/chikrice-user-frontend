import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import { View500 } from 'src/sections/error';

// ----------------------------------------------------------------------

export default function Page500() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title> 500 {t('serverError')} </title>
      </Helmet>

      <View500 />
    </>
  );
}
