import { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

import useStore from 'src/store';
import { LoadingScreen } from 'src/components/loading-screen';

import PlanDashboardDay from '../day/plan-dashboard-day';
// import ContinueTour from 'src/components/welcome-guide/continue-tour';
// import { useTourContext } from 'src/context/hooks/use-tour-hook';

// import { useTranslate } from 'src/locales';

// import { HomeSkeleton } from '../home-skeleton';
// ----------------------------------------------------------------------

export default function DashboardView() {
  const { roadmap, plans, todayPlan, isLoading, error } = useStore((state) => state);
  console.log('Roadmap', roadmap);
  console.table('Plans', plans);
  console.log('todayPlay', todayPlan);
  const [activeDay, setActiveDay] = useState(todayPlan);

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
    <Box>
      <PlanDashboardDay
        planDay={plans}
        activeDay={activeDay || todayPlan}
        setActiveDay={setActiveDay}
        totalDays={plans.length}
        planMonth={[]}
      />
    </Box>
  );
}
