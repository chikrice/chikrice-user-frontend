import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';
import InputAdornment from '@mui/material/InputAdornment';

import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

export default function BodyDetails({ userInputs, onNext }) {
  const { t } = useTranslate();

  const defaultValues = {
    height: userInputs.height || '',
    startWeight: userInputs.startWeight || '',
    age: userInputs.age || '',
  };

  const bodyDetailsSchema = Yup.object().shape({
    height: Yup.number()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .min(80, t('minHeight'))
      .max(250, t('maxHeight'))
      .required(t('heightRequired')),
    startWeight: Yup.number()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .min(30, t('minWeight'))
      .max(200, t('maxWeight'))
      .required(t('weightRequired')),
    age: Yup.number()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .min(10, t('minAge'))
      .max(100, t('maxAge'))
      .required(t('agetRequired')),
  });

  const methods = useForm({
    resolver: yupResolver(bodyDetailsSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    data.currentWeight = data.startWeight;
    onNext(data);
  });

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h2" textAlign={'center'}>
        {t('bodyDetails')}
      </Typography>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack
          sx={{
            mt: 3,
            maxWidth: 600,
            mx: 'auto',
            justifyContent: 'center',
            minHeight: { xs: 'calc(100svh - 300px)', md: 'unset' },
          }}
          spacing={4}
        >
          <RHFTextField
            name="height"
            type={'number'}
            label={t('height')}
            placeholder={t('heightPlaceholder')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <Iconify icon={'mdi:human-male-height'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            name="startWeight"
            type={'number'}
            label={t('weight')}
            placeholder={t('weightPlaceholder')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <Iconify icon={'fa-solid:weight'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            name="age"
            type={'number'}
            label={t('age')}
            placeholder={t('agePlaceholder')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <Iconify icon={'ph:baby-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <LoadingButton
          fullWidth
          onClick={onSubmit}
          color="primary"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 4 }}
        >
          {t('next')}
        </LoadingButton>
      </FormProvider>
    </Box>
  );
}

BodyDetails.propTypes = {
  onNext: PropTypes.func,
  userInputs: PropTypes.object,
};
