import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import StepsView from 'src/sections/steps/view';

// ----------------------------------------------------------------------

export default function StepsPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title> chikrice: {t('BMICalculation')}</title>
      </Helmet>

      <StepsView />
    </>
  );
}
