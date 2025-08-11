import { mutate } from 'swr';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { Box, ListItem, ListItemIcon, Stack, TextField, Typography } from '@mui/material';

import useStore from 'src/store';
import { endpoints } from 'src/utils/axios';
import { updatePlanDayMeal } from 'src/api/plan-day';
import { useLocales, useTranslate } from 'src/locales';
import CustomIconButton from 'src/components/custom-icon-button';

export default function EditBodyContent({
  ingredients,
  mealNotes,
  planDayId,
  mealId,
  setMealNotes,
}) {
  const { lang } = useLocales();
  const { t } = useTranslate();
  const { user } = useStore();

  const handleUpdatePlanDayMeal = useCallback(
    async (ingredient, isAdd) => {
      try {
        await updatePlanDayMeal(planDayId, { mealId, ingredient, isAdd });
      } catch (error) {
        console.error(error);
      } finally {
        await mutate(endpoints.plan_day.root(planDayId));
      }
    },
    [planDayId, mealId]
  );

  return (
    <Stack sx={{ width: '100%' }}>
      {ingredients.length ? (
        ingredients.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              pl: 0,
              pr: 0,
              '& .MuiListItemSecondaryAction-root': { right: '0 !important' },
            }}
            secondaryAction={
              <Stack flexDirection={'row'}>
                <CustomIconButton
                  icon={'icons8:minus'}
                  onClick={() => handleUpdatePlanDayMeal(item, false)}
                />
                <CustomIconButton
                  icon={'gg:add'}
                  onClick={() => handleUpdatePlanDayMeal(item, true)}
                />
              </Stack>
            }
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="subtitle2"
                color={'text.secondary'}
                sx={{
                  maxWidth: 70,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {item.name[lang]}
              </Typography>

              <Typography variant="body2" color={'text.secondary'}>
                ~ {item.portion.qty + ' ' + item.portion.label[lang]}
              </Typography>
            </Box>
          </ListItem>
        ))
      ) : (
        <Typography variant="body2" color={'text.secondary'} textAlign={'center'}>
          {t('addFirstItemToMeal')}
        </Typography>
      )}

      {user?.role === 'coach' && (
        <TextField
          value={mealNotes}
          onChange={(e) => setMealNotes(e.target.value)}
          sx={{ mt: 2 }}
          size="small"
          variant="filled"
          label={t('notes')}
        />
      )}
    </Stack>
  );
}

EditBodyContent.propTypes = {
  ingredients: PropTypes.array,
  planDayId: PropTypes.string,
  mealId: PropTypes.string,
  mealNotes: PropTypes.string,
  setMealNotes: PropTypes.func,
};
