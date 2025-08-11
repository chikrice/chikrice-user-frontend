import PropTypes from 'prop-types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';
import { isPastDate } from 'src/utils/format-time';
import { useBoolean } from 'src/hooks/use-boolean';

import AlternativesDrawerFree from '../alternatives-drawer-free';
import ViewActionsContent from '../../common/view-actions-content';
import { InfoDialog, HeaderActionsPopover, ViewBodyContent } from './view-mode';
import { EditActionPanel, EditBodyContent, EditFooterContent } from './edit-mode';
// Import styles
import { cardStyle, headerStyle, contentStyle, actionsStyle } from '../../common/styles';

//-----------------------------------------------------------------------

export default function MealCardFree({
  date,
  mode,
  index,
  notes,
  macros,
  mealId,
  planDayId,
  mealNumber,
  ingredients,
  alternatives,
}) {
  const { t } = useTranslate();
  const isPast = useMemo(() => isPastDate(date), [date]);

  const isInfo = useBoolean();
  const isAlternatives = useBoolean();

  const cardRef = useRef(null);

  const [mealNotes, setMealNotes] = useState(notes);

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
              {t('meal')} {mealNumber}
            </Typography>
            <Typography variant="body2" color={'text.secondary'}>
              {macros.cal.toFixed()} {t('calorie')}
            </Typography>
          </Stack>

          <HeaderActionsPopover
            mode={mode}
            isPast={isPast}
            mealId={mealId}
            mealNotes={mealNotes}
            planDayId={planDayId}
            canSave={!!ingredients.length}
          />
        </Box>

        {/* Content */}
        <CardContent sx={contentStyle}>
          {mode === 'view' ? (
            <ViewBodyContent ingredients={ingredients} mealNotes={mealNotes} />
          ) : (
            <EditBodyContent
              ingredients={ingredients}
              planDayId={planDayId}
              mealId={mealId}
              mealNotes={mealNotes}
              setMealNotes={setMealNotes}
            />
          )}
        </CardContent>

        {/* Actions */}
        <CardActions className={'dash__tour__4'} sx={actionsStyle}>
          {mode === 'view' ? (
            <ViewActionsContent
              index={index}
              isPast={isPast}
              planDayId={planDayId}
              onShowInfo={isInfo.onTrue}
              onListAlternatives={isAlternatives.onTrue}
            />
          ) : (
            <EditFooterContent macros={macros} />
          )}
        </CardActions>
      </Card>

      {mode === 'edit' && (
        <EditActionPanel
          mealId={mealId}
          planDayId={planDayId}
          canSave={!!ingredients.length}
          mealNotes={mealNotes}
          selectedIngredients={ingredients}
        />
      )}

      <InfoDialog
        open={isInfo.value}
        macros={macros}
        ingredients={ingredients}
        onClose={isInfo.onFalse}
      />

      <AlternativesDrawerFree
        index={index}
        planDayId={planDayId}
        open={isAlternatives.value}
        alternatives={alternatives}
        onOpen={isAlternatives.onTrue}
        onClose={isAlternatives.onFalse}
        currentMeal={{ macros, mealNumber, ingredients }}
      />
    </>
  );
}

MealCardFree.propTypes = {
  date: PropTypes.string,
  index: PropTypes.number,
  notes: PropTypes.string,
  mode: PropTypes.string,
  isFree: PropTypes.bool,
  mealId: PropTypes.string,
  macros: PropTypes.object,
  ingredients: PropTypes.array,
  alternatives: PropTypes.array,
  planDayId: PropTypes.string,
  mealNumber: PropTypes.number,
  onListAlternatives: PropTypes.func,
  recommendedMacros: PropTypes.object,
};
