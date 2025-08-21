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

// -------------------------------------

interface UseGetPlanReturn {
  plan: PlanType;
  planLoading: boolean;
  planError: unknown;
  planValidating: boolean;
}

interface ActivePlan {
  number: number;
  planId: string;
}

// -------------------------------------

export default function DashboardView() {
  const { plans, todayPlan, totalDays, roadmapLoading, roadmapError } = useStore((state) => state);

  const [currentDay, setCurrentDay] = useState(todayPlan?.number);

  const activePlan = useMemo<ActivePlan>(
    () => ({
      number: currentDay,
      planId: plans[currentDay - 1]?.planId,
    }),
    [currentDay, plans]
  );

  const { plan, planLoading }: UseGetPlanReturn = useGetPlan(activePlan?.planId);

  const handleBack = useCallback(() => {
    if (currentDay > 1) {
      setCurrentDay((prevDay: number) => prevDay - 1);
    }
  }, [setCurrentDay, currentDay]);

  const handleNext = useCallback(() => {
    if (currentDay < totalDays) {
      setCurrentDay((prevDay: number) => prevDay + 1);
    }
  }, [setCurrentDay, currentDay, totalDays]);

  const handleNavigateTo = useCallback(
    (day: number) => {
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

  if (roadmapLoading) {
    return <LoadingScreen />;
  }

  if (roadmapError) {
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

      <Meals plan={plan} planLoading={planLoading} />

      <AddNewMeal plan={plan} />

      <DayNavigator
        date={plan?.date}
        plans={plans}
        planMonth={[]}
        totalDays={totalDays}
        activePlan={activePlan}
        currentDay={currentDay}
        isLoading={planLoading}
        isDisableMealsActions={true}
        //
        onBack={handleBack}
        onNext={handleNext}
        onNavigateTo={handleNavigateTo}
      />
    </Stack>
  );
}
