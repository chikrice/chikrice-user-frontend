import { useContext } from 'react';

import { TourContext } from '../tour';

// ----------------------------------------------------------------------

export const useTourContext = () => {
  const context = useContext(TourContext);

  if (!context) throw new Error('useTourContext context must be use inside TourProvider');

  return context;
};
