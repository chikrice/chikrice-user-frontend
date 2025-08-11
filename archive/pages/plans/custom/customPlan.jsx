import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import { CustomPlanView } from 'src/sections/plans/view';

// ----------------------------------------------------------------------

export default function CustomPlanPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>chikrice : {t('customPlan')}</title>
      </Helmet>

      <CustomPlanView />
    </>
  );
}
