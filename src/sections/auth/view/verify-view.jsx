import * as Yup from 'yup';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';

import { paths } from 'src/routes/paths';
import { router } from 'src/routes/navigation';
import { api, endpoints } from 'src/utils/axios';
import { EmailInboxIcon } from 'src/assets/icons';
import { RouterLink } from 'src/routes/components';
import { useSearchParams } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { LeftIcon } from 'src/components/carousel/arrow-icons';
import FormProvider, { RHFCode } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ModernVerifyView() {
  const VerifySchema = Yup.object().shape({
    code: Yup.string().min(6, 'Code must be at least 6 characters').required('Code is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    isResetPassword: Yup.boolean().required('is Reset password is required'),
  });

  const searchParams = useSearchParams();
  const isResendCode = useBoolean();
  const [countdown, setCountdown] = useState(0);
  const email = searchParams.get('email');
  const redirectTo = searchParams.get('redirectTo');

  const defaultValues = {
    code: '',
    email: email,
    isResetPassword: redirectTo === 'reset-password' ? true : false,
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // Countdown timer effect
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await api.post(endpoints.auth.verifyEmailCode, data);
      console.log(res);
      const token = res.data.resetPasswordToken;
      console.log(token);
      router.push(paths.auth.newPassword(token));
    } catch (error) {
      console.error(error);
    }
  });

  const handleResendCode = async () => {
    try {
      isResendCode.onTrue();
      await api.post(endpoints.auth.resendVerificationCode, { email });
      enqueueSnackbar('Email sent successfully!');
      // Start 2-minute countdown (120 seconds)
      setCountdown(120);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Something went wrong, Please try again!', { variant: 'error' });
    } finally {
      isResendCode.onFalse();
    }
  };

  // Format countdown to MM:SS
  const formatCountdown = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFCode name="code" />

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Verify
      </LoadingButton>

      <Typography variant="body2">
        {`Don't have a code? `}
        {countdown > 0 ? (
          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
            Resend available in {formatCountdown(countdown)}
          </Typography>
        ) : (
          <LoadingButton
            variant="text"
            size="small"
            loading={isResendCode.value}
            onClick={handleResendCode}
            disabled={countdown > 0}
          >
            Resend code
          </LoadingButton>
        )}
      </Typography>

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
      <EmailInboxIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">Please check your email!</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          We have emailed a 6-digit confirmation code to {email}, please enter the code in below box to verify
          your email.
        </Typography>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
