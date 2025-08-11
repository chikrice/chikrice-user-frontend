import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/material';

import MilestoneOngoing from './milestone-ongoing';
import MilestoneAccomplished from './milestone-accomplished';

export default function MilestonesBreakdown({ milestones, onGoingMonth }) {
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

MilestonesBreakdown.propTypes = { milestones: PropTypes.array, onGoingMonth: PropTypes.number };
