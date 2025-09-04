import * as Yup from 'yup';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import { yupResolver } from '@hookform/resolvers/yup';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';

import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// -------------------------------------

interface UpdatePasswordFormProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: { password: string }) => void;
}

export default function UpdatePasswordForm({ open, onClose, onCreate }: UpdatePasswordFormProps) {
  const password = useBoolean();
  const { t } = useTranslate();

  const NewPasswordSchema = Yup.object().shape({
    password: Yup.string().trim().required(t('passwordRequired')).min(6, t('passwordError')),
    confirmPassword: Yup.string()
      .trim()
      .oneOf([Yup.ref('password'), null], t('passwordNotMatch'))
      .required(t('confirmPasswordRequired')),
  });

  const defaultValues = {
    password: '',
    confirmPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data: { password: string }) => {
    try {
      onCreate({
        password: data.password,
      });
      onClose();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>{t('newPassword')}</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={2.5} mt={2}>
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
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button color="inherit" variant="outlined" onClick={onClose}>
            {t('cancel')}
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {t('update')}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
