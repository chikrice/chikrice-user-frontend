import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import { ContactView } from 'src/sections/contact/view';

// ----------------------------------------------------------------------

export default function ContactPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>
          {t('chikrice')} : {t('contactUs')}
        </title>
      </Helmet>

      <ContactView />
    </>
  );
}
