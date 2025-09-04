import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { Container, IconButton } from '@mui/material';

import useStore from 'src/store';
import { paths } from 'src/routes/paths';
import BMIView from 'src/sections/BMI/view';
import { useRouter } from 'src/routes/hooks';
import { useLocalStorage } from 'src/hooks/use-local-storage';
import { LoadingScreen } from 'src/components/loading-screen';
import { LeftIcon } from 'src/components/carousel/arrow-icons';

import Gender from './gender';
import ProgressBar from './progress';
import BodyDetails from './body-details';
import ActivityLevel from './activity-level';
import WeightLifting from './weight-lifting';
import GoalAchievementSpeed from './goal-achievement-speed';

const STORAGE_KEY = 'user-inputs';

export const userInputsInitialState = {
  age: null,
  height: null,
  startWeight: null,
  currentWeight: null,
  gender: null,
  activityLevel: null,
  isWeightLifting: null,
  targetWeight: null,
  goalAchievementSpeed: null,
};

export default function UserInputs() {
  const router = useRouter();
  const { user, authenticated, createRoadmap, updateUser } = useStore();

  const [step, setStep] = useState(1);
  const { state: userInputs, update } = useLocalStorage(STORAGE_KEY, userInputsInitialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onBack = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    } else {
      router.back();
    }
  };

  const onNext = async (values) => {
    // Update user inputs and move to next step
    const updatePromises = Object.entries(values).map(([key, value]) => update(key, value));
    await Promise.all(updatePromises);

    if (step < 6) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleFinalSubmission = async () => {
    if (!authenticated) {
      router.push(paths.auth.register.user);
    } else {
      try {
        setIsSubmitting(true);
        await createRoadmap({ userId: user.id, ...userInputs });
        await updateUser(userInputs);
        router.push(paths.progress);
      } catch (error) {
        console.error(error);
        enqueueSnackbar(error.message || 'Failed to create your roadmap, please try again', {
          variant: 'error',
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    if (step === 6 && userInputs.goalAchievementSpeed) {
      handleFinalSubmission();
    }
    // eslint-disable-next-line
  }, [userInputs, step]);

  return (
    <Container>
      <Stack width={'100%'} sx={{ display: 'flex', py: 2, alignItems: 'start' }}>
        <IconButton onClick={onBack}>
          <LeftIcon />
        </IconButton>
      </Stack>
      <ProgressBar percent={step * 16.6} />

      <Stack
        sx={{
          mt: 4,
          alignItems: 'center',
          maxWidth: 400,
          mx: 'auto',
        }}
      >
        {step === 1 && <Gender gender={userInputs.gender} onNext={onNext} />}
        {step === 2 && <BodyDetails userInputs={userInputs} onNext={onNext} />}
        {step === 3 && <ActivityLevel activityLevel={userInputs.activityLevel} onNext={onNext} />}
        {step === 4 && <WeightLifting isWeightLifting={userInputs.isWeightLifting} onNext={onNext} />}
        {step === 5 && <BMIView userInputs={userInputs} onNext={onNext} />}
        {step === 6 && <GoalAchievementSpeed speed={userInputs.goalAchievementSpeed} onNext={onNext} />}
      </Stack>

      {isSubmitting && <LoadingScreen />}
    </Container>
  );
}
