import { useCallback } from 'react';
import { Card, CardContent, ListItem, ListItemIcon, Typography } from '@mui/material';

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
  const getPlan = useStore((state) => state.getPlan);
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
      <Card
        onClick={handleClick}
        sx={{
          width: '100%',
          minWidth: '200px',
          cursor: 'pointer',
          boxShadow: (theme) => theme.customShadows.card,
          background: (theme) => theme.palette.background.paper,
        }}
      >
        <CardContent>
          {ingredients.map((item, index) => (
            <ListItem sx={{ p: 0.3 }} key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Typography variant="body2" color={'text.secondary'}>
                {item.name[lang]}
              </Typography>
            </ListItem>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
