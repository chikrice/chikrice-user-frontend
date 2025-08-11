import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';
import MealView from 'src/sections/meal/view/meal-view';

// ----------------------------------------------------------------------

export default function MealPage() {
  const { t } = useTranslate();

  return (
    <>
      <Helmet>
        <title>chikrice : {t('mealDetails')}</title>
      </Helmet>

      <MealView />
    </>
  );
}
