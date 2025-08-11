import PropTypes from 'prop-types';
import { Stack } from '@mui/material';

import MealCardPremium from './meal-card-preimum';

export default function PlanPremium({ currentDayData }) {
  return (
    <>
      <Stack sx={{ mt: 2 }} spacing={1.5}>
        {currentDayData.data.map((meal, index) => (
          <MealCardPremium
            key={meal.id}
            id={meal.id}
            type={meal.type}
            name={meal.name}
            imgUrl={meal.imgUrl}
            isTour={index === 2}
            calorie={meal.macros.cal}
            mealNumber={meal.number}
            alternatives={meal.alternatives}
          />
        ))}
      </Stack>
    </>
  );
}

PlanPremium.propTypes = {
  currentDayData: PropTypes.object.isRequired,
};
