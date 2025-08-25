import { Box } from '@mui/material';

import { getStreakColor } from './helpers';

interface StreakBoxProps {
  completionPercentage: number;
  onMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: () => void;
}

export default function StreakBox({ completionPercentage, onMouseEnter, onMouseLeave }: StreakBoxProps) {
  const backgroundColor = getStreakColor(completionPercentage);

  return (
    <Box
      aria-owns="mouse-over-popover"
      aria-haspopup="true"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{
        width: 16,
        height: 16,
        backgroundColor,
        borderRadius: 0.3,
        transition: 'background-color 0.3s ease',
      }}
    />
  );
}
