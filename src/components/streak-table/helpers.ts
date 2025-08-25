import { success } from 'src/theme/palette';

export const getStreakColor = (completionPercentage: number) => {
  if (completionPercentage === 0) {
    return 'background.neutral';
  }

  if (completionPercentage < 25) {
    return success.lighter;
  } else if (completionPercentage < 50) {
    return success.light;
  } else if (completionPercentage < 75) {
    return success.main;
  } else if (completionPercentage <= 100) {
    return success.dark;
  } else {
    return success.darker;
  }
};
