import useStore from 'src/store';
import { ReloadPage } from 'src/components/error-screen';
import { LoadingScreen } from 'src/components/loading-screen';

import MacrosBar from '../macros-bar';
import Meals from '../meals-list/meals';
import AddNewMeal from '../add-new-meal';
import DayNavigator from '../day-navigator';

// -------------------------------------

export default function DashboardView() {
  const { day, plan, plans, totalDays, planLoading, roadmapLoading, roadmapError, updateDay } = useStore(
    (state) => state
  );

  if (roadmapLoading) <LoadingScreen />;
  if (roadmapError) <ReloadPage />;

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
