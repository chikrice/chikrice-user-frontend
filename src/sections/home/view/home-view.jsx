//import PropTypes from 'prop-types';

import { Box } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import Faqs from '../faqs';
// import Problem from '../problem';
// import OurMission from '../our-mission';
import HowWeHelpYou from '../how-we-help';
import ProcessPlan from '../process-plan';
import { ChikriceLandingAnimation } from '../chikrice-landing-animation';

export default function HomeView() {
  const router = useRouter();

  const onCallToAction = () => {
    router.push(paths.steps.user);
  };

  return (
    <>
      <Box
        className="min-h-screen w-full bg-black relative overflow-hidden"
        style={{
          overflow: 'hidden',
          height: '100svh',
          width: '100%',
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            background: (theme) => `
            radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
            radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
            radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
            radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
            ${theme.palette.background.default}
          `,
          }}
        />
      </Box>
      <div style={{ paddingBottom: '10rem', overflow: 'hidden' }}>
        <ChikriceLandingAnimation onCallToAction={onCallToAction} />
        {/* <Problem onCallToAction={onCallToAction} /> */}
        <HowWeHelpYou onCallToAction={onCallToAction} />
        <ProcessPlan onCallToAction={onCallToAction} />
        {/* <OurMission onCallToAction={onCallToAction} /> */}
        <Faqs onCallToAction={onCallToAction} />
        {/* <SuccessTestemonials /> */}
      </div>
    </>
  );
}

//HomeView.propTypes = {}
