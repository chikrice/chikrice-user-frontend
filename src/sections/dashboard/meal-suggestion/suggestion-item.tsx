import { useCallback } from 'react';
import styled from '@emotion/styled';
import { ListItem, ListItemIcon, Paper, Typography } from '@mui/material';

import useStore from 'src/store';
import { useLocales } from 'src/locales';
import { api, endpoints } from 'src/utils/axios';

import type { MealIngredient, Meal } from 'chikrice-types';

// -------------------------------------

interface SuggestionItemProps {
  ingredients: MealIngredient[];
  meal: Meal;
  planId: string;
}

// -------------------------------------

export default function SuggestionItem({ ingredients, meal, planId }: SuggestionItemProps) {
  const { lang } = useLocales();
  const { getPlan } = useStore((state) => state);
  const handleClick = useCallback(async () => {
    try {
      await api.patch(endpoints.plans.meals.addSuggested(planId), { meal });
    } catch (error) {
      console.error(error);
    } finally {
      await getPlan(planId);
    }
  }, [planId, meal, getPlan]);

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

const StyledMealSuggestion = styled(Paper)(() => ({
  padding: '.7rem ',
  minWidth: 150,
  borderRadius: 16,
  width: 'fit-conent',
}));
