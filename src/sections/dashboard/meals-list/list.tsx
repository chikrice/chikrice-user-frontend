import { useMemo } from 'react';
import { Box, Stack } from '@mui/material';

import { isPastDate } from 'src/utils/format-time';

import MealCard from '../meal-card';
import MealSuggestion from '../meal-suggestion';

import type { PlanType } from 'chikrice-types';

// -------------------------------------
interface MealsListProps {
  plan: PlanType;
}
export default function MealsList({ plan }: MealsListProps) {
  const isPast = useMemo(() => isPastDate(plan?.date), [plan]);

  const isMealSuggestions = plan?.meals?.some((meal) => meal?.mode === 'edit');

  return (
    <Box sx={{ pb: 45 }}>
      {!!plan?.meals?.length && (
        <Stack spacing={1.5} px={2} pt={2}>
          {plan?.meals?.map((meal, index) => (
            <MealCard
              key={meal?.id ?? index}
              index={index}
              meal={meal}
              plan={plan}
              isAction={true}
              ingredients={Object.values(meal?.ingredients).flat()}
            />
          ))}
        </Stack>
      )}

      {!isMealSuggestions && !isPast && (
        <MealSuggestion planId={plan?.id} mealNumber={plan?.meals?.length + 1} />
      )}
    </Box>
  );
}
