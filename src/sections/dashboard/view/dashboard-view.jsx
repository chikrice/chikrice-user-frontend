import { useCallback, useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import useStore from 'src/store';
import { useGetPlan } from 'src/api/plans';
import { LoadingScreen } from 'src/components/loading-screen';

import MacrosBar from '../macros-bar';
import Meals from '../meals-list/meals';
import AddNewMeal from '../add-new-meal';
import DayNavigator from '../day-navigator';

// ----------------------------------------------------------------------

export default function DashboardView() {
  const { plans, todayPlan, totalDays, isLoading, error } = useStore((state) => state);

  const [activePlan, setActivePlan] = useState(todayPlan);
  const [currentDay, setCurrentDay] = useState(todayPlan?.number);
  const { plan, planLoading } = useGetPlan(activePlan?.id);

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
    setActivePlan({ number: currentDay, id: plans[currentDay - 1]?.id });
  }, [currentDay, setActivePlan, plans]);

  useEffect(() => {
    // TODO: update activity log base on the consoumed calories
    // light green if calories are less than target
    // green if calories are equal to target
    // red if calories are more than target
    // dark red if calories are more than target
    // eslint-disable-next-line
  }, [plan?.consumedMacros]);

  if (isLoading) {
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
      <MacrosBar
        isPro={true}
        className="dash__tour__2"
        isLoading={planLoading}
        targetMacros={plan?.targetMacros}
        consumedMacros={plan?.consumedMacros}
      />

      <Meals plan={plan} plans={plans} currentDay={currentDay} />

      <AddNewMeal planId={plan.id} />

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
        isDisableMealsActions={!plan?.meals.length}
      />
    </Stack>
  );
}
