import { Stack } from '@mui/material';
import Container from '@mui/material/Container';

import useStore from 'src/store';
import StreakTable from 'src/components/streak-table';
import { ReloadPage } from 'src/components/error-screen';
import { LoadingScreen } from 'src/components/loading-screen';
import { useTourContext } from 'src/context/hooks/use-tour-hook';
import StartTuorPoint from 'src/components/welcome-guide/start-tour-point';

import RoadmapOverview from '../roadmap-overview';
import MilestonesBreakdown from '../milestones-breakdown';
// ----------------------------------------------------------------------

export default function ProgressView() {
  const { isFirstLogin } = useTourContext();

  const { roadmap, roadmapLoading, roadmapError } = useStore((state) => state);

  if (roadmapLoading) return <LoadingScreen />;

  if (roadmapError) return <ReloadPage />;

  return (
    <Container>
      <Stack spacing={3} mt={2} pb={20}>
        {isFirstLogin && <StartTuorPoint isWeightChangeOverLimit={roadmap.isWeightChangeOverLimit} />}

        <RoadmapOverview overview={roadmap.overview} />

        <MilestonesBreakdown milestones={roadmap.milestones} onGoingMonth={roadmap.onGoingMonth} />

        <StreakTable
          activityLog={roadmap.activityLog}
          onGoingMonth={roadmap.onGoingMonth}
          onGoingDay={roadmap.onGoingDay}
          totalDays={roadmap.overview.totalDays}
        />
      </Stack>
    </Container>
  );
}
