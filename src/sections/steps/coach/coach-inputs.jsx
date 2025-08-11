import * as Yup from 'yup';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Stack,
  Typography,
  FormControl,
  MenuItem,
  FormHelperText,
  InputAdornment,
  IconButton,
  Box,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import { useRouter } from 'src/routes/hooks';
import Iconify from 'src/components/iconify';
import AuthModernLayout from 'src/layouts/auth/modern';
import { setStorage } from 'src/hooks/use-local-storage';
import FormProvider, { RHFRadioGroup, RHFSelect, RHFTextField } from 'src/components/hook-form';

import SpecialityChip from './speciality-chip';

const COACH_STORAGE_KEY = 'coach-inputs';

const SPECIALITIES = [
  {
    id: 'naturalFitness',
    name: { en: 'Natural Fitness', ar: 'لياقة طبيعية', fa: 'تناسب اندام طبیعی' },
  },
  { id: 'bodybuilding', name: { en: 'Bodybuilding', ar: 'كمال الأجسام', fa: 'بدنسازی' } },
  { id: 'powerlifting', name: { en: 'Powerlifting', ar: 'رفع الأثقال', fa: 'پاورلیفتینگ' } },
  {
    id: 'speedAgility',
    name: { en: 'Speed and Agility', ar: 'السرعة والرشاقة', fa: 'سرعت و چابکی' },
  },
  {
    id: 'contestPrep',
    name: {
      en: 'Bodybuilding Contest Prep',
      ar: 'تحضير منافسات كمال الأجسام',
      fa: 'آماده سازی مسابقات بدنسازی',
    },
  },
];

const EXPERIENCE_YEARS = [5, 6, 7, 8, 9, 10];

export default function CoachInputs() {
  const { t } = useTranslate();
  const router = useRouter();

  // Local state for selected specialities
  const [selectedSpecialities, setSelectedSpecialities] = useState([]);

  const coachSchema = Yup.object().shape({
    age: Yup.number().required(t('ageRequired')),
    gender: Yup.string().required(t('genderRequired')),
    experience: Yup.string().required(t('experienceRequired')),
    speciality: Yup.array().min(1, t('specialityRequired')).max(2, t('specialityMaxError')),
  });

  const methods = useForm({
    resolver: yupResolver(coachSchema),
    defaultValues: {
      experience: '',
      age: '',
      gender: 'male',
      speciality: [],
    },
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = methods;

  // Update form data in local storage on submit
  const onSubmit = handleSubmit(async (data) => {
    setStorage(COACH_STORAGE_KEY, data);
    router.push(paths.auth.register.coach);
  });

  // Update specialities and set form value
  const handleSpecialitySelect = (speciality) => {
    setSelectedSpecialities((prev) => {
      const isSelected = prev.some((item) => item.id === speciality.id);
      const updated = isSelected
        ? prev.filter((item) => item.id !== speciality.id)
        : prev.length < 2
          ? [...prev, speciality]
          : prev;
      setValue('speciality', updated);
      return updated;
    });
  };

  const renderExperienceSelect = (
    <FormControl fullWidth>
      <RHFSelect name="experience" maxHeight={400} label={t('experience')}>
        {EXPERIENCE_YEARS.map((year) => (
          <MenuItem key={year} value={year}>
            {year === 10 ? '10+' : year} {t('years')}
          </MenuItem>
        ))}
      </RHFSelect>
    </FormControl>
  );

  const renderSpecialities = (
    <Stack direction="row" spacing={1} flexWrap="wrap">
      {SPECIALITIES.map((speciality) => (
        <SpecialityChip
          key={speciality.id}
          speciality={speciality}
          isSelected={selectedSpecialities.some((item) => item.id === speciality.id)}
          onSelect={handleSpecialitySelect}
        />
      ))}
      {errors.speciality && (
        <FormHelperText error sx={{ mt: 1 }}>
          {t('specialityRequired')}
        </FormHelperText>
      )}
    </Stack>
  );

  const renderCoachForm = (
    <>
      <Stack spacing={2}>
        <Typography variant="subtitle2">{t('speciality')}</Typography>
        {renderSpecialities}

        {renderExperienceSelect}

        <RHFTextField
          name="age"
          type="number"
          label={t('age')}
          placeholder={t('agePlaceholder')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <Iconify icon="ph:baby-fill" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box pl={1}>
          <RHFRadioGroup
            row
            name="gender"
            label={t('gender')}
            options={[
              { label: '🙍‍♂️ ' + t('male'), value: 'male' },
              { label: '🙎‍♀️ ' + t('female'), value: 'female' },
            ]}
          />
        </Box>

        <LoadingButton
          fullWidth
          variant="contained"
          color="inherit"
          size="large"
          type="submit"
          loading={isSubmitting}
          sx={{ mt: 4 }}
        >
          {t('next')}
        </LoadingButton>
      </Stack>
    </>
  );

  return (
    <AuthModernLayout>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderCoachForm}
      </FormProvider>
    </AuthModernLayout>
  );
}
