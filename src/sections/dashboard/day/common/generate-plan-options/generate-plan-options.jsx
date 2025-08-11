import { mutate } from 'swr';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { useCallback, useMemo } from 'react';
import { Button, Container, Paper, Stack, Typography } from '@mui/material';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import { endpoints } from 'src/utils/axios';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { copyMeals, useGetPlanDay } from 'src/api/plan-day';

import ChikrcieGeneratorConfig from './chikrice-generator-config';

export default function GeneratePlanOptions({ currentDay, planDay, planDayId }) {
  const { t } = useTranslate();
  const { user } = useStore();

  const isChikriceConfig = useBoolean(false);

  const yesterdayPlanId = useMemo(() => planDay[currentDay - 2]?.id, [currentDay, planDay]);
  const { plan: yesterdayPlan } = useGetPlanDay(yesterdayPlanId);

  const handleLoadYesterdayMeals = useCallback(async () => {
    try {
      const todayPlanId = planDay[currentDay - 1].id;
      await copyMeals(todayPlanId, { sourcePlanId: yesterdayPlanId });
      await mutate(endpoints.plan_day.root(todayPlanId));
    } catch (error) {
      console.error('Error copying meals:', error);
    }
  }, [currentDay, planDay, yesterdayPlanId]);

  const handleLoadSavedPlan = useCallback(async () => {
    console.log('Load saved plan');
  }, []);

  return (
    <Container>
      <Stack sx={{ mt: 5, justifyContent: 'center' }} spacing={2}>
        <Paper sx={{ boxShadow: (theme) => theme.customShadows.card, p: 4, textAlign: 'center' }}>
          <Typography variant="subtitle1">{t('createMealPlan')}</Typography>
          <Typography variant="body2" color="text.secondary">
            {t('customMealHelp')} {user?.name?.split(' ')[0]}
          </Typography>
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            startIcon={<Iconify icon="material-symbols:dashboard-customize-rounded" />}
            onClick={isChikriceConfig.onTrue}
            size="large"
          >
            {t('create')}
          </Button>
        </Paper>

        {!!user?.savedPlans?.length && (
          <Button
            variant="outlined"
            startIcon={<Iconify icon="lets-icons:bookmark-fill" />}
            onClick={handleLoadSavedPlan}
          >
            {t('loadSavedPlan')}
          </Button>
        )}

        {currentDay > 1 && yesterdayPlan?.meals.length > 0 && (
          <LoadingButton
            variant="outlined"
            startIcon={<Iconify icon="ic:round-update" />}
            onClick={handleLoadYesterdayMeals}
          >
            {t('loadYesterdayPlan')}
          </LoadingButton>
        )}
      </Stack>

      <ChikrcieGeneratorConfig
        open={isChikriceConfig.value}
        onClose={isChikriceConfig.onFalse}
        planDayId={planDayId}
      />
    </Container>
  );
}

GeneratePlanOptions.propTypes = {
  planDay: PropTypes.array.isRequired,
  currentDay: PropTypes.number.isRequired,
  planDayId: PropTypes.string.isRequired,
  onCreateCustom: PropTypes.func,
};
