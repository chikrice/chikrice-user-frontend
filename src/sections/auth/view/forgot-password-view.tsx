import * as Yup from 'yup';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';

import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import { router } from 'src/routes/navigation';
import { PasswordIcon } from 'src/assets/icons';
import { api, endpoints } from 'src/utils/axios';
import { RouterLink } from 'src/routes/components';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { LeftIcon, RightIcon } from 'src/components/carousel/arrow-icons';

// ----------------------------------------------------------------------

export default function ModernForgotPasswordView() {
  const { t } = useTranslate();

  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
  });

  const defaultValues = {
    email: '',
  };

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data: { email: string }) => {
    try {
      await api.post(endpoints.auth.forgotPassword, data);
      router.push(paths.auth.resetPasswordSuccess);
    } catch ({ error }) {
      await handleError(error?.code, data);
    }
  });

  const handleError = async (code: number, data: { email: string }) => {
    try {
      if (code === 404) {
        enqueueSnackbar(t('emailNotFound'), { variant: 'error' });
      } else if (code === 403) {
        await api.post(endpoints.auth.sendVerificationCode, data);
        router.push(paths.auth.verifyEmail(data.email, 'reset-password'));
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar(t('somethingWentWrong'), { variant: 'error' });
    }
  };

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFTextField name="email" label="Email address" type={'email'} />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        endIcon={<RightIcon icon="eva:arrow-ios-forward-fill" />}
        sx={{ justifyContent: 'space-between', pl: 2, pr: 1.5 }}
      >
        Send Request
      </LoadingButton>

      <Link
        component={RouterLink}
        href={paths.auth.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <LeftIcon width={16} />
        Return to sign in
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      <PasswordIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">Forgot your password?</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Please enter the email address associated with your account and We will email you a link to reset
          your password.
        </Typography>
      </Stack>
    </>
  );

  return (
    <>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderHead}

        {renderForm}
      </FormProvider>
    </>
  );
}
