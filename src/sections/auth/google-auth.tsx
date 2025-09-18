import { useSnackbar } from 'notistack';
import Divider from '@mui/material/Divider';
import LoadingButton from '@mui/lab/LoadingButton';
import { useGoogleLogin } from '@react-oauth/google';

import useStore from 'src/store';
import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { router } from 'src/routes/navigation';
import { useBoolean } from 'src/hooks/use-boolean';

import { areUserInputsValid } from './helpers';

import type { UserInputs } from 'src/types';

// -------------------------------------

interface GoogleAuthProps {
  userInputs?: UserInputs;
}

export default function GoogleAuth({ userInputs }: GoogleAuthProps) {
  const { t } = useTranslate();
  const googleLoading = useBoolean();

  const googleAuth = useStore((state) => state.googleAuth);
  const loadUserJourney = useStore((state) => state.loadUserJourney);
  const createUserJourney = useStore((state) => state.createUserJourney);

  const { enqueueSnackbar } = useSnackbar();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (googleRes) => {
      googleLoading.onTrue();

      const data = {
        role: 'user' as const,
        Authorization: googleRes.code,
        userInputs,
      };

      const user = await googleAuth(data);
      const isValid = areUserInputsValid(userInputs);

      if (user?.roadmapId) {
        router.push(paths.dashboard);
        await loadUserJourney(user.roadmapId);
      } else if (!user?.roadmapId && isValid) {
        await createUserJourney({ ...userInputs, userId: user.id });
        router.push(paths.dashboard);
      } else {
        router.push(paths.steps.user);
      }

      googleLoading.onFalse();
    },
    onError: () => {
      googleLoading.onFalse();
      enqueueSnackbar(t('somethingWentWrong'), { variant: 'error' });
    },
    flow: 'auth-code',
  });

  return (
    <>
      <Divider sx={{ borderStyle: 'dashed', my: 2 }} />

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        variant="outlined"
        onClick={() => handleGoogleLogin()}
        loading={googleLoading.value}
        endIcon={<Iconify icon="flat-color-icons:google" />}
        sx={{ justifyContent: 'center', pl: 2, pr: 1.5 }}
      >
        Google
      </LoadingButton>
    </>
  );
}
