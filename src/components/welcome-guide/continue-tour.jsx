import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Joyride from 'react-joyride';

import { useTranslate } from 'src/locales';
import { useTourContext } from 'src/context/hooks/use-tour-hook';

export default function ContinueTour({ tourName }) {
  const { steps, run, setRun, stepIndex, handleJoyrideCallback, joyrideStyles } =
    useTourContext(tourName);
  const { t } = useTranslate();
  useEffect(() => {
    setRun(true);
  }, [setRun]);

  return (
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
  );
}

ContinueTour.propTypes = {
  tourName: PropTypes.string,
};
