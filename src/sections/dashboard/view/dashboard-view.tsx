import useStore from 'src/store';
import { ReloadPage } from 'src/components/error-screen';
import { LoadingScreen } from 'src/components/loading-screen';

import MacrosBar from '../macros-bar';
import Meals from '../meals-list/meals';
import AddNewMeal from '../add-new-meal';
import DayNavigator from '../day-navigator';

// -------------------------------------

export default function DashboardView() {
  const { day, plan, plans, totalDays, roadmapLoading, roadmapError, isAuthLoading, planLoading, updateDay } =
    useStore((state) => state);

  // Add comprehensive loading checks
  const isLoading = isAuthLoading || roadmapLoading || planLoading;
  const isDataReady = !isLoading && plans && plans.length > 0 && plan;

  console.log('📊 [DASHBOARD] State:', {
    isAuthLoading,
    roadmapLoading,
    planLoading,
    plansCount: plans?.length,
    hasPlan: !!plan,
    isDataReady,
  });

  if (isLoading) {
    console.log('📊 [DASHBOARD] Showing loading screen');
    return <LoadingScreen />;
  }

  if (roadmapError) {
    console.log('📊 [DASHBOARD] Showing error page');
    return <ReloadPage />;
  }

  if (!isDataReady) {
    console.log('📊 [DASHBOARD] Data not ready, showing loading');
    return <LoadingScreen />;
  }

  console.log('📊 [DASHBOARD] Rendering dashboard with plan:', plan?.id);

  return (
    <>
      <MacrosBar plan={plan} className="dash__tour__2" isLoading={planLoading} />

      <Meals plan={plan} planLoading={planLoading} />

      <AddNewMeal plan={plan} />

      <DayNavigator
        day={day}
        plan={plan}
        plans={plans}
        totalDays={totalDays}
        planLoading={planLoading}
        isDisableMealsActions={true}
        //
        updateDay={updateDay}
      />
    </>
  );
}
