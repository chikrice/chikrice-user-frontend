import { useEffect, useRef } from 'react';
import { Box, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import CustomIconButton from 'src/components/custom-icon-button';

// Import styles
import { cardStyle, headerStyle, contentStyle, actionsStyle } from './styles';
//
import { InfoDialog, HeaderActionsPopover, ViewBodyContent } from './view-mode';
import { EditActionPanel, EditBodyContent, EditFooterContent } from './edit-mode';

import type { MealIngredient, Meal, PlanType } from 'chikrice-types';

// -------------------------------------

interface MealCardProps {
  meal: Meal;
  index: number;
  plan: PlanType;
  isAction: boolean;
  ingredients: MealIngredient[];
}

// -------------------------------------

export default function MealCard({ meal, index, plan, ingredients, isAction = true }: MealCardProps) {
  const { t } = useTranslate();

  const isInfo = useBoolean();
  const mdUp = useResponsive('up', 'md');

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ingredients.length && cardRef.current && index !== 0) {
      cardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [ingredients]);

  return (
    <>
      <Card className={'dash__tour__3'} sx={cardStyle} ref={cardRef}>
        <Box sx={headerStyle}>
          <Stack>
            <Typography variant="subtitle2" textTransform={'capitalize'} textAlign={'start'}>
              {t('meal')} {index + 1}
            </Typography>
            <Typography variant="body2" color={'text.secondary'}>
              {meal.macros.cal.toFixed()} {t('calorie')}
            </Typography>
          </Stack>

          {isAction && (
            <HeaderActionsPopover mode={meal.mode} mealId={meal.id} mealIndex={index} planId={plan.id} />
          )}
        </Box>

        <CardContent sx={contentStyle}>
          {meal.mode === 'view' ? (
            <ViewBodyContent ingredients={ingredients} />
          ) : (
            <EditBodyContent ingredients={ingredients} mealIndex={index} />
          )}
        </CardContent>

        <CardActions className={'dash__tour__4'} sx={actionsStyle}>
          {meal.mode === 'view' ? (
            <CustomIconButton icon={'fluent:info-28-regular'} onClick={isInfo.onTrue} />
          ) : (
            <EditFooterContent macros={meal.macros} />
          )}
        </CardActions>
      </Card>

      {!mdUp && (
        <EditActionPanel
          mealId={meal.id}
          mealIndex={index}
          planId={plan.id}
          isOpen={meal.mode === 'edit'}
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
