//import PropTypes from 'prop-types';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import Hero from '../hero';
import Faqs from '../faqs';
import Problem from '../problem';
import OurMission from '../our-mission';
import HowWeHelpYou from '../how-we-help';
import ProcessPlan from '../process-plan';
// import SuccessTestemonials from '../success-testemonials';

export default function HomeView() {
  const router = useRouter();

  const onCallToAction = () => {
    router.push(paths.steps.user);
  };

  return (
    <div style={{ paddingBottom: '10rem' }}>
      <Hero onCallToAction={onCallToAction} />
      <Problem onCallToAction={onCallToAction} />
      <HowWeHelpYou onCallToAction={onCallToAction} />
      <ProcessPlan onCallToAction={onCallToAction} />
      <OurMission onCallToAction={onCallToAction} />
      <Faqs onCallToAction={onCallToAction} />
      {/* <SuccessTestemonials /> */}
    </div>
  );
}

//HomeView.propTypes = {}
