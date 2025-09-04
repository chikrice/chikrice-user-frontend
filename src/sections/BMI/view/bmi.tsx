import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

// import BMILoading from '../bmi-loading';
import BMIResults from '../bmi-results';

export default function BMIView({ userInputs, onNext }) {
  return (
    <Box>
      <BMIResults userInputs={userInputs} onNext={onNext} />
    </Box>
  );
}

BMIView.propTypes = {
  onNext: PropTypes.func,
  userInputs: PropTypes.object,
};
