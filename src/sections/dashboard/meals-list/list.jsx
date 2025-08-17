import { useMemo } from 'react';
import { Box, Container, Stack } from '@mui/material';

import { useTranslate } from 'src/locales';
import { isPastDate } from 'src/utils/format-time';
import EmptyContent from 'src/components/empty-content';

import MealCard from '../meal-card';
import MealSuggestion from '../meal-suggestion';

export default function MealsList({ plan }) {
  const { t } = useTranslate();
  const isPast = useMemo(() => isPastDate(plan.date), [plan]);

  const isMealSuggestions = plan.meals?.some((meal) => meal?.mode === 'edit');
  return (
    <Box sx={{ pb: 45 }}>
      {plan.meals.length ? (
        <Container sx={{ mt: 2 }}>
          <Stack spacing={1.5}>
            {plan.meals.map((meal, index) => (
              <MealCard
                key={meal.id}
                index={index}
                meal={meal}
                isPast={isPast}
                date={plan.date}
                planId={plan.id}
                ingredients={Object.values(meal?.activeMeal?.ingredients).flat()}
              />
            ))}
          </Stack>
        </Container>
      ) : (
        isPast && (
          <EmptyContent
            title={t('noPlanForThisDay')}
            description={t('noPlanForThisDayDesc')}
            sx={{ mt: '10svh' }}
          />
        )
      )}

      {!isMealSuggestions && !isPast && (
        <MealSuggestion planId={plan.id} mealNumber={plan.meals.length + 1} />
      )}
    </Box>
  );
}
