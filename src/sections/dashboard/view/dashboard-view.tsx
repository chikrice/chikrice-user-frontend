import { Container } from '@mui/material';

import useStore from 'src/store';
import { ReloadPage } from 'src/components/error-screen';
import { LoadingScreen } from 'src/components/loading-screen';

import Meals from '../meals-list';
import MacrosBar from '../macros-bar';
import AddNewMeal from '../add-new-meal';
import DayNavigator from '../day-navigator';

// -------------------------------------

export default function DashboardView() {
  const day = useStore((state) => state.day);
  const plan = useStore((state) => state.plan);
  const plans = useStore((state) => state.plans);
  const totalDays = useStore((state) => state.totalDays);
  const roadmapLoading = useStore((state) => state.roadmapLoading);
  const roadmapError = useStore((state) => state.roadmapError);
  const planError = useStore((state) => state.planError);
  const isAuthLoading = useStore((state) => state.isAuthLoading);
  const planLoading = useStore((state) => state.planLoading);
  const updateDay = useStore((state) => state.updateDay);

  // Add comprehensive loading checks
  const isLoading = isAuthLoading || roadmapLoading;

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (roadmapError || planError) {
    return <ReloadPage />;
  }

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 3 } }}>
      <MacrosBar plan={plan} />

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
    </Container>
  );
}
