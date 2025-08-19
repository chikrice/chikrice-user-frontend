import { useEffect, useRef } from 'react';
import { Box, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';
import { useBoolean } from 'src/hooks/use-boolean';
import CustomIconButton from 'src/components/custom-icon-button';

// Import styles
import { cardStyle, headerStyle, contentStyle, actionsStyle } from './styles';
//
import { InfoDialog, HeaderActionsPopover, ViewBodyContent } from './view-mode';
import { EditActionPanel, EditBodyContent, EditFooterContent } from './edit-mode';

import type { Ingredient, Meal, PlanType } from 'chikrice-types';

// -------------------------------------

interface MealCardProps {
  meal: Meal;
  plan: PlanType;
  isPast: boolean;
  ingredients: Ingredient[];
}

// -------------------------------------

export default function MealCard({ meal, isPast, plan, ingredients }: MealCardProps) {
  const { t } = useTranslate();

  const isInfo = useBoolean();

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ingredients.length && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [ingredients]);

  return (
    <>
      <Card className={'dash__tour__3'} sx={cardStyle} ref={cardRef}>
        {/* Header */}
        <Box sx={headerStyle}>
          <Stack>
            <Typography variant="subtitle2" textTransform={'capitalize'}>
              {t('meal')} {meal.number}
            </Typography>
            <Typography variant="body2" color={'text.secondary'}>
              {meal.macros.cal.toFixed()} {t('calorie')}
            </Typography>
          </Stack>

          <HeaderActionsPopover
            mode={meal.mode}
            isPast={isPast}
            mealId={meal.id}
            planId={plan.id}
            canSave={!!ingredients.length}
          />
        </Box>

        <CardContent sx={contentStyle}>
          {meal.mode === 'view' ? (
            <ViewBodyContent ingredients={ingredients} />
          ) : (
            <EditBodyContent ingredients={ingredients} planId={plan.id} mealId={meal.id} />
          )}
        </CardContent>

        {/* Actions */}
        <CardActions className={'dash__tour__4'} sx={actionsStyle}>
          {meal.mode === 'view' ? (
            <CustomIconButton icon={'fluent:info-28-regular'} onClick={isInfo.onTrue} />
          ) : (
            <EditFooterContent macros={meal.macros} />
          )}
        </CardActions>
      </Card>

      {meal.mode === 'edit' && (
        <EditActionPanel
          mealId={meal.id}
          planId={plan.id}
          canSave={!!ingredients.length}
          selectedIngredients={ingredients}
        />
      )}

      <InfoDialog
        open={isInfo.value}
        macros={meal.macros}
        ingredients={ingredients}
        onClose={isInfo.onFalse}
      />
    </>
  );
}
