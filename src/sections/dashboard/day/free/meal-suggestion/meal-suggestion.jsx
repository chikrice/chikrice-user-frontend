import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import { useMealSuggestions } from 'src/api/plan-month';

import SuggestionItem from './suggestion-item';

export default function MealSuggestion({ planDayId, mealNumber }) {
  const { t } = useTranslate();
  const { planMonthId } = useStore();

  const { suggestions, suggestionsLoading } = useMealSuggestions(planMonthId, {
    planDayId,
    mealNumber,
  });

  if (suggestionsLoading || !suggestions.length) return;

  return (
    <Box mt={3}>
      <Typography ml={3} variant="h6">
        {t('suggestions')} {mealNumber}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          width: '100%',
          scrollSnapType: 'x mandatory',
          '::-webkit-scrollbar': { display: 'none' },
          px: 2,
          mt: 1,
          pb: 2,
          gap: 1.5,
        }}
      >
        {suggestions.map((meal, index) => (
          <SuggestionItem
            key={index}
            meal={meal}
            planDayId={planDayId}
            ingredients={Object.values(meal?.activeMeal?.ingredients).flat()}
          />
        ))}
      </Box>
    </Box>
  );
}

MealSuggestion.propTypes = {
  planDayId: PropTypes.string,
  planMonthId: PropTypes.string,
  mealNumber: PropTypes.number,
};
