//import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import HomeView from 'src/sections/home/view';

export default function HomePage() {
  const { t } = useTranslate();
  return (
    <>
      <Helmet>
        <title>chikrice : {t('home')}</title>
      </Helmet>

      <HomeView />
    </>
  );
}

//HomePage.propTypes = {}
