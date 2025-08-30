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
  const isLoading = isAuthLoading || roadmapLoading;

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (roadmapError) {
    return <ReloadPage />;
  }

  return (
    <>
      <MacrosBar plan={plan} className="dash__tour__2" isLoading={planLoading} />

      <Meals plan={plan} planLoading={planLoading} />

      <AddNewMeal />

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
