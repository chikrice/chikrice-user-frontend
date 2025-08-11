import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import MenuView from 'src/sections/menu/view';

// ----------------------------------------------------------------------

export default function MenuPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>chikrice : {t('subscription')}</title>
      </Helmet>

      <MenuView />
    </>
  );
}
