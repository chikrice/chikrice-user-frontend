// macrosBarStyles.js
import { Theme } from '@mui/material/styles';

export const progressBarStyles = {
  width: '100%',
  height: 20,
  borderRadius: 10,
  overflow: 'hidden',
  backgroundColor: (theme: Theme) => theme.palette.card.default,
  mb: 0.5,
};

export const allowedCalFillWrapper = {
  width: '84%',
  left: 0,
  height: '100%',
};

export const allowedCalFillStyles = (targetCal: number, consumedCal: number) => ({
  width: !targetCal ? 0 : `${Math.min((consumedCal / targetCal) * 100, 100)}%`,
  transition: '.7s linear',
  height: '100%',
  backgroundColor: 'text.primary',
});

export const overConsumedCalFillStyles = (targetCal: number, consumedCal: number) => ({
  width: consumedCal > targetCal ? `${((consumedCal - targetCal) / targetCal) * 100}%` : 0,
  transition: '.7s linear',
  height: '100%',
  backgroundColor: 'error.main',
  position: 'absolute',
  top: 0,
  left: '85%', // Start where targetCal ends
});

export const calorieLineStyles = {
  position: 'absolute',
  height: '100%',
  width: 3.5,
  right: '15%',
  top: 0,
  backgroundColor: 'warning.main',
};

export const calorieIconStyles = {
  position: 'absolute',
  height: '85%',
  aspectRatio: '1/1',
  borderRadius: '50%',
  left: 2,
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'background.paper',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 9,
};

export const calorieInfoStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  fontSize: '11px',
  fontWeight: 'bold',
  color: 'text.secondary',
  minWidth: '100px',
};

export const macroBreakdownStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '11px',
  fontWeight: 'bold',
  height: '32px',
};

export const stickyBarStyles = {
  position: 'sticky',
  p: 1,
  pt: 2,
  px: '5%',
  top: '-2px',
  left: 0,
  zIndex: 100,
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
};
