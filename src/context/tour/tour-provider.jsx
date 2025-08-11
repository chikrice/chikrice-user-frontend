import PropTypes from 'prop-types';
import { ACTIONS, EVENTS, STATUS } from 'react-joyride';
import { useState, useMemo, useCallback, useEffect } from 'react';

import { useRouter } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import { useJoyrideStyles } from 'src/components/welcome-guide/styles';

import useTourData from './data';
import { TourContext } from './tour-context';

// ----------------------------------------------------------------------

const TOUR_STATU_KEY = 'tour-status';

const initialState = {
  isTourStarted: false,
  isFirstLogin: true,
  isFirstTimePlan: true,
};

export function TourProvider({ children, tourName = 'intro' }) {
  const isOverLimit = useBoolean(false);

  const router = useRouter();
  const [tours, setTours] = useState({ intro: [], dashboard: [] });
  const [run, setRun] = useState(false);
  const joyrideStyles = useJoyrideStyles();
  const [stepIndex, setStepIndex] = useState(0);

  const { state, update } = useLocalStorage(TOUR_STATU_KEY, initialState);

  const tourData = useTourData({ isOverLimit: isOverLimit.value });

  useEffect(() => {
    setTours(tourData);
  }, [tourData]);

  const onStartTour = useCallback(
    (isWeightChangeOverLimit) => {
      isWeightChangeOverLimit ? isOverLimit.onTrue() : isOverLimit.onFalse();
      update('isTourStarted', true);
    },
    [update, isOverLimit]
  );

  const onEndIntroTour = useCallback(() => {
    update('isFirstLogin', false);
  }, [update]);

  const onEndDashboardTour = useCallback(() => {
    update('isFirstTimePlan', false);
    update('isTourStarted', false);
  }, [update]);

  const onUpdateTourState = useCallback(
    (value) => {
      update('isFirstLogin', value);
      update('isFirstTimePlan', value);
    },
    [update]
  );

  const handleJoyrideCallback = (data) => {
    const { action, index, status, type } = data;

    const currentStep = tours[tourName][index];

    if ([EVENTS.STEP_AFTER].includes(type)) {
      // Check if it's the last step (index 3 in your case)
      if (index === 3 && action === ACTIONS.NEXT) {
        setRun(false); // Close the tour

        // Optional: Call your end tour logic
        if (tourName === 'intro') {
          onEndIntroTour();
        }
        if (tourName === 'dashboard') {
          onEndDashboardTour();
        }
        router.push(currentStep.nextPath);
        return; // Exit the function, don't proceed further
      }

      // Check if we should navigate between pages to continue tour
      if (action === ACTIONS.NEXT && currentStep.nextPath) {
        setStepIndex(index + 1);
        router.push(currentStep.nextPath);
      } else if (action === ACTIONS.PREV && currentStep.prevPath) {
        router.push(currentStep.prevPath);
        setStepIndex(index - 1);
      } else {
        // Continue the tour normally
        setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
      }
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
      if (tourName === 'intro') {
        onEndIntroTour();
      }
      if (tourName === 'dashboard') {
        onEndDashboardTour();
      }
    }
  };

  const memoizedValue = useMemo(
    () => ({
      run,
      ...state,
      steps: tours[tourName],
      stepIndex,
      joyrideStyles,
      //
      setRun,
      onStartTour,
      onUpdateTourState,
      handleJoyrideCallback,
    }),
    //eslint-disable-next-line
    [run, state, stepIndex, joyrideStyles, setRun, onStartTour, onUpdateTourState]
  );

  return <TourContext.Provider value={memoizedValue}>{children}</TourContext.Provider>;
}

TourProvider.propTypes = {
  children: PropTypes.node,
  tourName: PropTypes.string,
};
