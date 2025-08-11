import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import { GeneralPlanView } from 'src/sections/plans/view';

// ----------------------------------------------------------------------

export default function GeneralPlanPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>chikrice : {t('generalPlan')}</title>
      </Helmet>

      <GeneralPlanView />
    </>
  );
}
