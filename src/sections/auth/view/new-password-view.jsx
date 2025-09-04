import * as Yup from 'yup';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { api, endpoints } from 'src/utils/axios';
import { RouterLink } from 'src/routes/components';
import { useBoolean } from 'src/hooks/use-boolean';
import { useSearchParams } from 'src/routes/hooks';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ModernNewPasswordView() {
  const password = useBoolean();
  const { t } = useTranslate();
  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .trim()
      .required(t('passwordRequired'))
      .min(8, t('passwordError'))
      .matches(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/, t('passwordMustContainNumberAndLetter')),
    confirmPassword: Yup.string()
      .trim()
      .oneOf([Yup.ref('password'), null], t('passwordNotMatch'))
      .required(t('confirmPasswordRequired')),
  });

  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const defaultValues = {
    password: '',
  };

  const methods = useForm({
    mode: 'onChange',
    resolver: yupResolver(NewPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await api.post(endpoints.auth.resetPassword(token), { password: data.password });
      enqueueSnackbar('password reset successful');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('something wenth wrong, please try agian!', { variant: 'error' });
    }
  });

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <RHFTextField
        name="confirmPassword"
        label="Confirm New Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Update Password
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
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        Return to sign in
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      <Stack spacing={1} sx={{ my: 3 }}>
        <Typography variant="h3">Reset your password!</Typography>
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
