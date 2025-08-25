import { Box, ListItem, ListItemIcon, Stack, Typography } from '@mui/material';

import useStore from 'src/store';
import { useLocales, useTranslate } from 'src/locales';
import CustomIconButton from 'src/components/custom-icon-button';

import type { MealIngredient } from 'chikrice-types';

// -------------------------------------
interface EditBodyContentProps {
  ingredients: MealIngredient[];
  mealIndex: number;
}

export default function EditBodyContent({ ingredients, mealIndex }: EditBodyContentProps) {
  const { lang } = useLocales();
  const { t } = useTranslate();

  const { incrementIngredient, decrementIngredient } = useStore((state) => state);

  return (
    <Stack sx={{ width: '100%' }}>
      {ingredients.length ? (
        ingredients.map((item) => (
          <ListItem
            key={item.ingredientId}
            sx={{
              pl: 0,
              pr: 0,
              '& .MuiListItemSecondaryAction-root': { right: '0 !important' },
            }}
            secondaryAction={
              <Stack flexDirection={'row'}>
                <CustomIconButton
                  icon={'icons8:minus'}
                  onClick={() => decrementIngredient(mealIndex, item)}
                />
                <CustomIconButton icon={'gg:add'} onClick={() => incrementIngredient(mealIndex, item)} />
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
    </Stack>
  );
}
