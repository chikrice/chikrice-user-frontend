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
  const { planMonth, planDay, todayPlan, loading, error } = useStore((state) => state);

  const [activeDay, setActiveDay] = useState(todayPlan);

  if (loading) {
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
        planDay={planDay}
        activeDay={activeDay || todayPlan}
        setActiveDay={setActiveDay}
        totalDays={planMonth.totalDays}
        planMonth={planMonth.data}
      />
    </Box>
  );
}
