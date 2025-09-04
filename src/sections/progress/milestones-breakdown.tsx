import { Box, Stack } from '@mui/material';

import MilestoneOngoing from './milestone-ongoing';
import MilestoneAccomplished from './milestone-accomplished';

import type { Milestone } from 'chikrice-types';

// -------------------------------------

interface MilestonesBreakdownProps {
  milestones: Milestone[];
  onGoingMonth: number;
}

export default function MilestonesBreakdown({ milestones, onGoingMonth }: MilestonesBreakdownProps) {
  return (
    <Stack spacing={1}>
      {milestones?.map((milestone, index) => (
        <Box key={index}>
          {milestone.month < onGoingMonth && <MilestoneAccomplished milestone={milestone} />}
          {milestone.month === onGoingMonth && <MilestoneOngoing milestone={milestone} />}
        </Box>
      ))}
    </Stack>
  );
}
