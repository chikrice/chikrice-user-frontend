import { useMemo } from 'react';
import { Box, Container, Stack } from '@mui/material';

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
        <Container sx={{ mt: 2 }}>
          <Stack spacing={1.5}>
            {plan?.meals?.map((meal, index) => (
              <MealCard
                key={meal?.id ?? index}
                index={index}
                meal={meal}
                plan={plan}
                ingredients={Object.values(meal?.ingredients).flat()}
              />
            ))}
          </Stack>
        </Container>
      )}

      {!isMealSuggestions && !isPast && (
        <MealSuggestion planId={plan?.id} mealNumber={plan?.meals?.length + 1} />
      )}
    </Box>
  );
}
