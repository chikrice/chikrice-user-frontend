import PropTypes from 'prop-types';

import { SplashScreen } from 'src/components/loading-screen';

import { TourContext } from './tour-context';

// ----------------------------------------------------------------------

export function TourConsumer({ children, isWeightChangeOverLimit }) {
  console.log(isWeightChangeOverLimit);

  return (
    <TourContext.Consumer>
      {(tour) => (tour.loading ? <SplashScreen /> : children)}
    </TourContext.Consumer>
  );
}

TourConsumer.propTypes = {
  children: PropTypes.node,
  isWeightChangeOverLimit: PropTypes.bool,
};
