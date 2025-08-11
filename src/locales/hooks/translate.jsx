import { useTranslate } from 'src/locales';

export function useTranslatePlanHeader() {
  const { t } = useTranslate();

  const translateHeader = (plan) => {
    const { type, daysCount, mealsInDay, snacksInDay } = plan;

    const days = daysCount + ' ' + t('days');
    const snacks = snacksInDay + t('snack');
    const meals = `${mealsInDay} ${mealsInDay > 1 ? t('mealsInDay') : t('meal')}`;

    let content;

    if (type === 'custom') {
      content = `${days} (${meals}, ${snacks})`;
    } else if (type === 'snack') {
      content = `${days} (${snacks})`;
    } else if (type === 'meal') {
      content = `${days} (${meals})`;
    }

    return content;
  };
  return { translateHeader };
}
