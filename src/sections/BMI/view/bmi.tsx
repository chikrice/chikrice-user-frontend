import Box from '@mui/material/Box';

import BMIResults from '../bmi-results';

// -------------------------------------

interface BMIViewProps {
  userInputs: { startWeight: number; height: number };
  onNext: (data: { targetWeight: number }) => void;
}

export default function BMIView({ userInputs, onNext }: BMIViewProps) {
  return (
    <Box>
      <BMIResults userInputs={userInputs} onNext={onNext} />
    </Box>
  );
}
