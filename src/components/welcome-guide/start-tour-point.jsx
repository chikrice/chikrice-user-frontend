import PropTypes from 'prop-types';
import { useCallback } from 'react';
import Joyride from 'react-joyride';

import { useTranslate } from 'src/locales';
import { useTourContext } from 'src/context/hooks/use-tour-hook';
import StartTour from 'src/components/welcome-guide/start-tour-button';

export default function StartTuorPoint({ isWeightChangeOverLimit }) {
  const { t } = useTranslate();

  const {
    steps,
    run,
    stepIndex,
    setRun,
    isTourStarted,
    onStartTour,
    handleJoyrideCallback,
    joyrideStyles,
  } = useTourContext();

  const handleStart = useCallback(() => {
    onStartTour(isWeightChangeOverLimit);
    setRun(true);
  }, [setRun, onStartTour, isWeightChangeOverLimit]);

  return (
    <>
      <StartTour isTourStarted={isTourStarted} onClick={handleStart} />
      <Joyride
        run={run}
        steps={steps}
        continuous={true}
        scrollOffset={50}
        showProgress={true}
        stepIndex={stepIndex}
        showSkipButton={true}
        styles={joyrideStyles}
        disableOverlayClose={true}
        disableScrollParentFix={true}
        callback={handleJoyrideCallback}
        locale={{
          back: t('back'),
          close: t('close'),
          last: t('last'),
          next: t('next'),
          skip: t('skip'),
        }}
      />
    </>
  );
}

StartTuorPoint.propTypes = {
  isWeightChangeOverLimit: PropTypes.bool,
};
