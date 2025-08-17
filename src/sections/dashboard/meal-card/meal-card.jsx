import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { Box, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';
import { useBoolean } from 'src/hooks/use-boolean';
import CustomIconButton from 'src/components/custom-icon-button';

// Import styles
import { cardStyle, headerStyle, contentStyle, actionsStyle } from './styles';
//
import { InfoDialog, HeaderActionsPopover, ViewBodyContent } from './view-mode';
import { EditActionPanel, EditBodyContent, EditFooterContent } from './edit-mode';

//-----------------------------------------------------------------------

export default function MealCard({ meal, isPast, planId, ingredients }) {
  const { t } = useTranslate();

  const isInfo = useBoolean();

  const cardRef = useRef(null);

  const [mealNotes, setMealNotes] = useState(meal.notes);

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
            mealId={meal._id}
            mealNotes={mealNotes}
            planId={planId}
            canSave={!!ingredients.length}
          />
        </Box>

        {/* Content */}
        <CardContent sx={contentStyle}>
          {meal.mode === 'view' ? (
            <ViewBodyContent ingredients={ingredients} mealNotes={mealNotes} />
          ) : (
            <EditBodyContent
              ingredients={ingredients}
              planId={planId}
              mealId={meal._id}
              mealNotes={mealNotes}
              setMealNotes={setMealNotes}
            />
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
          mealId={meal._id}
          planId={planId}
          canSave={!!ingredients.length}
          mealNotes={mealNotes}
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

MealCard.propTypes = {
  index: PropTypes.number,
  meal: PropTypes.object,
  isPast: PropTypes.bool,
  planId: PropTypes.string,
  ingredients: PropTypes.array,
};
