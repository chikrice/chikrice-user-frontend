import * as Yup from 'yup';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';
import InputAdornment from '@mui/material/InputAdornment';

import useStore from 'src/store';
import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { RouterLink } from 'src/routes/components';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import GoogleAuth from '../google-auth';

// ----------------------------------------------------------------------

export default function ModernLoginView() {
  const { t } = useTranslate();
  const password = useBoolean();

  const { login } = useStore();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required(t('emailRequired')).email(t('emailInvalid')),
    password: Yup.string()
      .trim()
      .required(t('passwordRequired'))
      .min(8, t('passwordError'))
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, t('passwordMustContainNumberAndLetter')),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => await login(data));

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 4 }}>
      <Typography variant="h4">{t('login')}</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">{t('newUser')}?</Typography>

        <Link component={RouterLink} href={paths.steps.user} variant="subtitle2">
          {t('createAccount')}
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField name="email" label={t('emailAddress')} />

      <RHFTextField
        name="password"
        label={t('password')}
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

      <Link
        component={RouterLink}
        href={paths.auth.forgotPassword}
        variant="body2"
        color="inherit"
        underline="always"
        sx={{ alignSelf: 'flex-end' }}
      >
        {t('forgotPassword')}?
      </Link>

      <LoadingButton
        fullWidth
        onClick={onSubmit}
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        sx={{ justifyContent: 'space-between', pl: 2, pr: 1.5 }}
      >
        {t('login')}
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}
      {renderForm}
      <GoogleAuth />
    </FormProvider>
  );
}
