import { Button, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState, useMemo } from 'react';

import useStore from 'src/store';
import { useGetPlan } from 'src/api/plans';
import { LoadingScreen } from 'src/components/loading-screen';

import MacrosBar from '../macros-bar';
import Meals from '../meals-list/meals';
import AddNewMeal from '../add-new-meal';
import DayNavigator from '../day-navigator';

import type { PlanType } from 'chikrice-types';

// ----------------------------------------------------------------------
interface UseGetPlanReturn {
  plan: PlanType;
  planLoading: boolean;
  planError: unknown;
  planValidating: boolean;
}
// ----------------------------------------------------------------------

export default function DashboardView() {
  const { plans, todayPlan, totalDays, isLoading, error } = useStore((state) => state);

  const [currentDay, setCurrentDay] = useState(todayPlan?.number ?? 1);

  const activePlan = useMemo(
    () => ({
      number: currentDay,
      planId: plans[currentDay - 1]?.planId,
    }),
    [currentDay, plans]
  );
  console.log('plans: ', plans);
  console.log('activePlan: ', activePlan);
  const { plan, planLoading }: UseGetPlanReturn = useGetPlan(activePlan?.planId);

  const handleBack = useCallback(() => {
    if (currentDay > 1) {
      setCurrentDay((prevDay) => prevDay - 1);
    }
  }, [setCurrentDay, currentDay]);

  const handleNext = useCallback(() => {
    if (currentDay < totalDays) {
      setCurrentDay((prevDay) => prevDay + 1);
    }
  }, [setCurrentDay, currentDay, totalDays]);

  const handleNavigateTo = useCallback(
    (day) => {
      if (day && day <= totalDays) {
        setCurrentDay(day);
      }
    },
    [setCurrentDay, totalDays]
  );

  useEffect(() => {
    // TODO: update activity log base on the consoumed calories
    // eslint-disable-next-line
  }, [plan?.consumedMacros]);

  console.log('isLoading: ', isLoading);
  console.log('planLoading: ', planLoading);
  console.log('plan: ', plan);

  if (isLoading || planLoading || !plan) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <Stack sx={{ mt: '40svh', px: 3, textAlign: 'center' }} spacing={2}>
        <Typography variant="body1">There was a problem fetching your data</Typography>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Reload App
        </Button>
      </Stack>
    );
  }

  return (
    <Stack>
      <MacrosBar plan={plan} className="dash__tour__2" isLoading={planLoading} />

      <Meals plan={plan} plans={plans} currentDay={currentDay} />

      <AddNewMeal plan={plan} />

      <DayNavigator
        date={plan?.date}
        onBack={handleBack}
        onNext={handleNext}
        planDayIds={plans}
        totalDays={totalDays}
        planMonth={[]}
        activePlan={activePlan}
        currentDay={currentDay}
        isLoading={planLoading}
        onNavigateTo={handleNavigateTo}
        isDisableMealsActions={true}
      />
    </Stack>
  );
}
