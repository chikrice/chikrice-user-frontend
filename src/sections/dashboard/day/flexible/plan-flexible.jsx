//import PropTypes from 'prop-types';

import PropTypes from 'prop-types';
import { Stack } from '@mui/material';

import MealCardFree from '../free/meal-card';
import MealCardPremium from '../premium/meal-card';

export default function PlanFlexible({ meals }) {
  return (
    <>
      <Stack sx={{ mt: 2 }} spacing={1.5}>
        {meals.map((meal) => (
          <>
            {meal.planType === 'premium' && (
              <MealCardPremium
                id={meal.id}
                key={meal.id}
                type={meal.type}
                name={meal.name}
                imgUrl={meal.imgUrl}
                playType={meal.playType}
                mealNumber={meal.number}
                macros={meal.macros}
                alternatives={meal.alternatives}
              />
            )}
            {meal.planType === 'free' && (
              <MealCardFree
                id={meal.id}
                key={meal.id}
                type={meal.type}
                macros={meal.macros}
                mealNumber={meal.number}
                calorie={meal.macros.cal}
                ingredients={meal.ingredients}
                alternatives={meal.alternatives}
              />
            )}
          </>
        ))}
      </Stack>

      {/* <PrepTipsFree /> */}
    </>
  );
}

PlanFlexible.propTypes = {
  meals: PropTypes.array,
};
