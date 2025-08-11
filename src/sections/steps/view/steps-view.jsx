//import PropTypes from 'prop-types';

import { useSearchParams } from 'src/routes/hooks';

import UserInputs from '../user/user-inputs';
import CoachInputs from '../coach/coach-inputs';

export default function StepsView() {
  const searchParams = useSearchParams();

  const role = searchParams.get('role');
  console.log('🚀 ~ StepsView ~ role:', role);

  return <>{role === 'user' ? <UserInputs /> : <CoachInputs />}</>;
}

//StepsView.propTypes = {}
