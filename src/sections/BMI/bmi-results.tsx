import * as Yup from 'yup';
import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import CardContent from '@mui/material/CardContent';
import { yupResolver } from '@hookform/resolvers/yup';
import InputAdornment from '@mui/material/InputAdornment';

import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

import BMIAlert from './bmi-alert';
import NormalBar from './normal-bar';
import OverweightBar from './over-weight-bar';
import UnderweightBar from './under-weight-bar';
import BMIResultPoint from './bmi-result-point';

// -------------------------------------

interface BMIResultsProps {
  userInputs: { startWeight: number; height: number };
  onNext: (data: { targetWeight: number }) => void;
}

export default function BMIResults({ userInputs, onNext }: BMIResultsProps) {
  const { startWeight, height } = userInputs;
  const { t } = useTranslate();

  const heightInMeters = height / 100;

  // Memoize the BMI calculation
  const bmi = useMemo(() => startWeight / (heightInMeters * heightInMeters), [startWeight, heightInMeters]);

  const bmiCategories = {
    underweight: 18.5,
    normal: 24.9,
    overweight: 25,
  };

  // Memoize the BMI position
  const bmiPosition = useMemo(() => {
    if (bmi <= bmiCategories.underweight) {
      // Map the BMI position to the first third (underweight range)
      const underweightRange = bmiCategories.underweight;
      const normalizedUnderweightPosition = bmi / underweightRange;
      return normalizedUnderweightPosition * 33.33; // 0% to 33.33%
    }

    if (bmi <= bmiCategories.normal) {
      // Map the BMI position to the second third (normal range)
      const normalRange = bmiCategories.normal - bmiCategories.underweight;
      const normalizedNormalPosition = (bmi - bmiCategories.underweight) / normalRange;
      return 33.33 + normalizedNormalPosition * 33.33; // 33.33% to 66.66%
    }

    if (bmi >= bmiCategories.overweight) {
      // Compress the overweight range to fit between 66.66% and 100%
      const maxBMI = 40; // Define the upper limit of the overweight range
      const compressedOverweightRange = maxBMI - bmiCategories.overweight;
      const normalizedOverweightPosition = (bmi - bmiCategories.overweight) / compressedOverweightRange;
      return 66.66 + normalizedOverweightPosition * 33.33; // 66.66% to 100%
    }

    return 100; // BMI is above the overweight category
    // eslint-disable-next-line
  }, [bmi]);

  const alertDetails = useMemo(() => {
    if (bmi < bmiCategories.underweight) return { label: 'underWeight', color: 'warning' as const };
    if (bmi > bmiCategories.overweight) return { label: 'overWeight', color: 'error' as const };
    return { label: 'normal', color: 'success' as const };
    // eslint-disable-next-line
  }, [bmi]);

  // Memoize the weight range calculation
  const [minNormalWeight, maxNormalWeight, avgNormalWeight] = useMemo(() => {
    const min = (bmiCategories.underweight * (heightInMeters * heightInMeters)).toFixed();
    const max = (bmiCategories.normal * (heightInMeters * heightInMeters)).toFixed();
    const avg = Math.round((+min + +max) / 2);
    return [min, max, avg];
    // eslint-disable-next-line
  }, [heightInMeters]);

  const defaultValues = {
    targetWeight: avgNormalWeight,
  };

  const targetWeightSchema = Yup.object().shape({
    targetWeight: Yup.number().required(t('weightRequired')).min(30, t('minWeight')).max(200, t('maxWeight')),
  });

  const methods = useForm({
    resolver: yupResolver(targetWeightSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data: { targetWeight: number }) => {
    onNext(data);
  });

  return (
    <Stack sx={{ width: '100%', alignItems: 'center', minHeight: 'calc(100svh - 150px)' }}>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h2" textAlign="center">
          {t('yourBmiResults')}
        </Typography>
        <Card sx={{ mt: 2, pb: 2.5, pt: 1.5 }}>
          <CardContent>
            <Box
              sx={{
                width: '100%',
                height: 10,
                position: 'relative',
                display: 'flex',
              }}
            >
              <UnderweightBar />
              <NormalBar minNormalWeight={minNormalWeight} maxNormalWeight={maxNormalWeight} />
              <OverweightBar />
              <BMIResultPoint bmiPosition={bmiPosition} />
            </Box>
          </CardContent>
        </Card>
        <BMIAlert
          bmi={bmi}
          userCurrentWeight={startWeight}
          userCurrentHeight={height}
          minNormalWeight={minNormalWeight}
          maxNormalWeight={maxNormalWeight}
          alertDetails={alertDetails}
        />
      </Box>
      <Stack sx={{ mt: 8, width: '100%' }}>
        <Typography variant="h4" mb={2} textAlign={'center'}>
          {t('enterYourGoal')}
        </Typography>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <RHFTextField
            name="targetWeight"
            type="number"
            label={t('targetWeight')}
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
          <LoadingButton
            fullWidth
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            sx={{ mt: 8 }}
          >
            {t('next')}
          </LoadingButton>
        </FormProvider>
      </Stack>
    </Stack>
  );
}
