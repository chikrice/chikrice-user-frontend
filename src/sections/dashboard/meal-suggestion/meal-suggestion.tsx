import { Box, Typography } from '@mui/material';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import { useMealSuggestions } from 'src/api/plans';

import SuggestionItem from './suggestion-item';

import type { Meal } from 'chikrice-types';

// -------------------------------------

interface MealSuggestionProps {
  planId: string;
  mealNumber: number;
}

// -------------------------------------

export default function MealSuggestion({ planId, mealNumber }: MealSuggestionProps) {
  const { t } = useTranslate();
  const { roadmap } = useStore((state) => state);

  const { suggestions, suggestionsLoading } = useMealSuggestions(planId, {
    roadmapId: roadmap.id,
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
        {suggestions.map((meal: Meal) => (
          <SuggestionItem
            key={meal.id}
            meal={meal}
            planId={planId}
            ingredients={Object.values(meal?.ingredients).flat()}
          />
        ))}
      </Box>
    </Box>
  );
}
