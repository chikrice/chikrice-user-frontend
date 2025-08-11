import { mutate } from 'swr';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import styled from '@emotion/styled';
import { ListItem, ListItemIcon, Paper, Typography } from '@mui/material';

import { useLocales } from 'src/locales';
import { endpoints } from 'src/utils/axios';
import { addSuggestedMealToPlanDayMeals } from 'src/api/plan-day';

export default function SuggestionItem({ ingredients, meal, planDayId }) {
  const { lang } = useLocales();

  const handleClick = useCallback(async () => {
    try {
      await addSuggestedMealToPlanDayMeals(planDayId, { meal });
    } catch (error) {
      console.error(error);
    } finally {
      await mutate(endpoints.plan_day.root(planDayId));
    }
  }, [planDayId, meal]);

  return (
    <>
      <StyledMealSuggestion elevation={3} onClick={handleClick}>
        {ingredients.map((item, index) => (
          <ListItem sx={{ p: 0.3 }} key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Typography variant="body2" color={'text.secondary'}>
              {item.name[lang]}
            </Typography>
          </ListItem>
        ))}
      </StyledMealSuggestion>
    </>
  );
}

SuggestionItem.propTypes = {
  ingredients: PropTypes.array,
  meal: PropTypes.object,
  planDayId: PropTypes.string,
};

const StyledMealSuggestion = styled(Paper)(() => ({
  padding: '.7rem ',
  minWidth: 150,
  borderRadius: 16,
  width: 'fit-conent',
}));
