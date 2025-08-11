//import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import LearnView from 'src/sections/learn/view';

export default function LearnPage() {
  const { t } = useTranslate();
  return (
    <>
      <Helmet>
        <title>chikrice : {t('learn')}</title>
      </Helmet>

      <LearnView />
    </>
  );
}

//HomePage.propTypes = {}
