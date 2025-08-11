import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function ProgressBar({ percent }) {
  return (
    <Box>
      <LinearProgress
        value={percent}
        variant="determinate"
        color="primary"
        sx={{ maxWidth: 400, mx: 'auto', height: 10 }}
      />
    </Box>
  );
}

ProgressBar.propTypes = {
  percent: PropTypes.number,
};
