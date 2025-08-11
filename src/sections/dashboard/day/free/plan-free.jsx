import PropTypes from 'prop-types';
import { Box, Container, Stack } from '@mui/material';

import { useTranslate } from 'src/locales';
import EmptyContent from 'src/components/empty-content';

import MealCardFree from './meal-card';
import MealSuggestion from './meal-suggestion';
// import GeneratePlanOptions from '../common/generate-plan-options';
// import PrepTipsFree from './prep-tips-free';

export default function PlanFree({
  meals,
  planDayId,
  date,
  isPast,
  //  planDay, currentDay
}) {
  const { t } = useTranslate();

  const isMealSuggestions = meals?.some((meal) => meal?.mode === 'edit');

  return (
    <Box sx={{ pb: 45 }}>
      {meals.length ? (
        <Container sx={{ mt: 2 }}>
          <Stack spacing={1.5}>
            {meals.map((meal, index) => (
              <MealCardFree
                key={index}
                date={date}
                index={index}
                mode={meal.mode}
                mealId={meal._id}
                notes={meal.notes}
                planDayId={planDayId}
                mealNumber={meal?.number}
                isConsumed={meal?.isConsumed}
                alternatives={meal.alternatives}
                macros={meal?.activeMeal?.macros}
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
        <MealSuggestion planDayId={planDayId} mealNumber={meals.length + 1} />
      )}
      {/* {!meals.length && !isPast && (
        <GeneratePlanOptions currentDay={currentDay} planDay={planDay} planDayId={planDayId} />
      )} */}

      {/* <PrepTipsFree /> */}
    </Box>
  );
}

PlanFree.propTypes = {
  meals: PropTypes.array.isRequired,
  isPast: PropTypes.bool,
  date: PropTypes.string,
  planDayId: PropTypes.string,
  planMonthId: PropTypes.string,
  currentDay: PropTypes.number,
  planDay: PropTypes.array,
};
