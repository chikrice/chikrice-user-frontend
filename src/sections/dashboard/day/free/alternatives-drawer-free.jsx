import { mutate } from 'swr';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { Box, Card, Container, Divider, Radio, Stack, Typography } from '@mui/material';

import { endpoints } from 'src/utils/axios';
import { switchMealOption } from 'src/api/plan-day';
import { useLocales, useTranslate } from 'src/locales';
import EmptyContent from 'src/components/empty-content/empty-content';
import CustomBottomDrawer from 'src/components/custom-drawer/custom-drawer';

//-----------------------------------------------------------------------

export default function AlternativesDrawerFree({
  open,
  index,
  onOpen,
  onClose,
  planDayId,
  currentMeal,
  alternatives,
}) {
  const { t } = useTranslate();
  const { lang } = useLocales();
  const handleSwitchMeal = useCallback(
    async (alternativeIndex) => {
      if (alternativeIndex === undefined) return;
      try {
        await switchMealOption(planDayId, { index, alternativeIndex });
        onClose();
      } catch (error) {
        console.log(error);
      } finally {
        await mutate(endpoints.plan_day.root(planDayId));
      }
    },
    [index, planDayId, onClose]
  );

  // Helper function for rendering macros information
  const renderMacros = ({ carb, pro, fat }) => (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      my={2}
      gap={3}
      fontWeight={500}
    >
      <small>{`${t('carb')} ${carb.toFixed(1)}g`}</small>
      <small>{`${t('pro')} ${pro.toFixed(1)}g`}</small>
      <small>{`${t('fat')} ${fat.toFixed(1)}g`}</small>
    </Stack>
  );

  // Memoized rendering of meal option to avoid unnecessary re-renders
  const renderMealOption = (ingredients, macros, alternativeIndex) => (
    <Card
      onClick={() => handleSwitchMeal(alternativeIndex)}
      key={nanoid()}
      sx={{
        width: '100%',
        px: 3,
        py: 2,
        boxShadow: (theme) => (alternativeIndex !== undefined ? theme.customShadows.card : ''),
        backgroundColor: alternativeIndex !== undefined ? 'transparent' : '',
        border: (theme) =>
          alternativeIndex == undefined ? `dashed 1px ${theme.palette.primary.main}` : '',
      }}
    >
      <Stack flexDirection="row" flexWrap="wrap" justifyContent="center" gap={1.5} my={2}>
        {ingredients?.map((item, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {item.icon && <span>{item.icon}</span>}
            <Typography variant="subtitle2">{item.name[lang]}</Typography>
          </Box>
        ))}
      </Stack>
      <Divider sx={{ borderStyle: 'dashed' }} />
      {renderMacros(macros)}
    </Card>
  );

  // Render the current meal with radio selection
  const renderCurrentMeal = (
    <Stack>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Radio checked color="primary" sx={{ p: 0 }} />
        <Typography color="text.secondary" sx={{ fontSize: '13px', fontWeight: 'bold' }}>
          {t('currentMeal')}
        </Typography>
      </Box>

      <Stack mt={2}>{renderMealOption(currentMeal.ingredients, currentMeal.macros)}</Stack>
    </Stack>
  );

  // Render alternative meal options
  const renderAlternatives = (
    <Box>
      {alternatives.length ? (
        <>
          <Typography variant="h5">{t('changeWith')}</Typography>
          <Stack spacing={1} alignItems="center" mt={1}>
            {alternatives.map((item, alternativeIndex) =>
              renderMealOption(
                Object.values(item.ingredients).flat(),
                item.macros,
                alternativeIndex
              )
            )}
          </Stack>
        </>
      ) : (
        <EmptyContent title={t('noAlternative')} />
      )}
    </Box>
  );

  return (
    <CustomBottomDrawer open={open} onOpen={onOpen} onClose={onClose} height="80svh">
      <Container>
        {renderCurrentMeal}
        <Divider sx={{ borderStyle: 'dashed', my: 2.5 }} />
        {renderAlternatives}
      </Container>
    </CustomBottomDrawer>
  );
}

AlternativesDrawerFree.propTypes = {
  open: PropTypes.bool,
  index: PropTypes.number,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  planDayId: PropTypes.string,
  currentMeal: PropTypes.object,
  alternatives: PropTypes.array,
};
