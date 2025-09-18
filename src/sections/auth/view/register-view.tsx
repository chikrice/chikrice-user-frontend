import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useMemo, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import InputAdornment from '@mui/material/InputAdornment';
import { Link, Stack, IconButton, Typography, Button } from '@mui/material';

import useStore from 'src/store';
import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import { useRouter } from 'src/routes/hooks';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { getStorage } from 'src/hooks/use-local-storage';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import GoogleAuth from '../google-auth';
import { areUserInputsValid } from '../helpers';

const USER_INPUTS_KEY = 'user-inputs';

export default function ModernRegisterView() {
  const { t } = useTranslate();
  const password = useBoolean();
  const router = useRouter();

  const userInputs = useMemo(() => getStorage(USER_INPUTS_KEY) || {}, []);

  const [isLoginWithEmail, setIsLoginWithEmail] = useState(false);
  const register = useStore((state) => state.register);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().trim().required(t('fullNameRequired')),
    email: Yup.string().trim().required(t('emailRequired')).email(t('emailInvalid')),
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

  const defaultValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const onSubmit = methods.handleSubmit(
    async (data) => {
      const credentials = {
        role: 'user',
        name: data.name,
        email: data.email,
        password: data.password,
      };

      try {
        await register(credentials, userInputs);
      } catch (error) {
        console.log(error);
      }
    },
    (errors) => {
      console.log(errors);
    }
  );

  useEffect(() => {
    const valid = areUserInputsValid(userInputs);

    if (!valid) {
      router.push(paths.steps.user);
    }
  }, [userInputs, router]);

  const renderHead = (
    <Stack sx={{ mb: 4, position: 'relative' }}>
      <Typography variant="h3">{t('register')}</Typography>
    </Stack>
  );

  const renderLoginWithEmailBtn = (
    <Button
      fullWidth
      size="large"
      variant="contained"
      endIcon={<Iconify icon={'fluent:mail-32-regular'} />}
      onClick={() => setIsLoginWithEmail(true)}
    >
      {t('email')}
    </Button>
  );

  const renderLoginWithGoogleLink = (
    <Stack sx={{ mt: 3, alignItems: 'center' }} onClick={() => setIsLoginWithEmail(false)}>
      <Link sx={{ cursor: 'pointer' }}>{t('registerWithGoogle')}</Link>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        color: 'text.secondary',
        mt: 2.5,
        typography: 'caption',
        textAlign: 'center',
      }}
    >
      {t('bySignIn')}
      <Link underline="always" color="text.primary">
        {t('termsOfService')}
      </Link>
      {t('and')}
      <Link underline="always" color="text.primary">
        {t('termsOfService')}
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField name="name" label={t('name')} helperText={''} type={'text'} />
      <RHFTextField name="email" label={t('emailAddress')} type={'email'} />
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
      <RHFTextField
        name="confirmPassword"
        label={t('confirmPassword')}
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

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={methods.formState.isSubmitting}
        endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
        sx={{ justifyContent: 'space-between', pl: 2, pr: 1.5 }}
      >
        {t('createAccount')}
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}
      {isLoginWithEmail ? renderForm : renderLoginWithEmailBtn}
      {!isLoginWithEmail ? <GoogleAuth userInputs={userInputs} /> : renderLoginWithGoogleLink}
      {renderTerms}
    </FormProvider>
  );
}
