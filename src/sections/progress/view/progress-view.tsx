import Container from '@mui/material/Container';
import { Grid, Stack, Typography } from '@mui/material';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import StreakTable from 'src/components/streak-table';
import { ReloadPage } from 'src/components/error-screen';
import { useResponsive } from 'src/hooks/use-responsive';
import { LoadingScreen } from 'src/components/loading-screen';
import { useTourContext } from 'src/context/hooks/use-tour-hook';
import StartTuorPoint from 'src/components/welcome-guide/start-tour-point';

import RoadmapOverview from '../roadmap-overview';
import MilestonesBreakdown from '../milestones-breakdown';

// -------------------------------------

export default function ProgressView() {
  const { t } = useTranslate();
  const isMdUp = useResponsive('up', 'md');
  const roadmap = useStore((state) => state.roadmap);
  const roadmapLoading = useStore((state) => state.roadmapLoading);
  const roadmapError = useStore((state) => state.roadmapError);
  const { isFirstLogin } = useTourContext() as { isFirstLogin: boolean };

  if (roadmapLoading) return <LoadingScreen />;

  if (roadmapError) return <ReloadPage />;

  return (
    <Container maxWidth={'lg'} sx={{ pb: 20, paddingX: { md: 8 } }}>
      {isMdUp && (
        <Typography variant="h3" mb={2} textTransform={'capitalize'}>
          {t('progress')}
        </Typography>
      )}
      {isFirstLogin && <StartTuorPoint isWeightChangeOverLimit={roadmap.isWeightChangeOverLimit} />}
      <Grid container spacing={2}>
        <Grid item xs={12} md={5} sx={{ height: '100%' }}>
          <RoadmapOverview overview={roadmap.overview} />
        </Grid>

        <Grid item xs={12} md={7}>
          <Stack spacing={2}>
            <StreakTable
              activityLog={roadmap.activityLog}
              onGoingDay={roadmap.onGoingDay}
              totalDays={roadmap.overview.totalDays}
            />
            <MilestonesBreakdown milestones={roadmap.milestones} onGoingMonth={roadmap.onGoingMonth} />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
