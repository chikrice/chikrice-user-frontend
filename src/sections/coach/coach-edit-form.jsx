import * as Yup from 'yup';
import { mutate } from 'swr';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
// import PhoneNumberInput from '../user/form-components/phone';
// import ExperienceInput from '../user/form-components/form-experience';
// import SpecialityInput from '../user/form-components/form-speciality';
// import { updateCoach } from 'src/api/coach';
import { enqueueSnackbar } from 'notistack';
import { Container, Stack } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useCallback } from 'react';

import { useTranslate } from 'src/locales';
import { endpoints } from 'src/utils/axios';
import FormProvider from 'src/components/hook-form';
import AgeInput from 'src/components/profile/form-components/form-age';
import CustomBottomDrawer from 'src/components/custom-drawer/custom-drawer';
import NameEmailGenderInputs from 'src/components/profile/form-components/form-name-email-gender';

// ----------------------------------------------------------------------

export default function CoachEditForm({ coach, isEdit, setIsEdit, fieldToBeEdited }) {
  const { t } = useTranslate();

  // Validation schema for coach fields
  const editCoachSchema = Yup.object().shape({
    name: Yup.string().required(t('fullNameRequired')),
    email: Yup.string().email(t('emailInvalid')).required(t('emailRequired')),
    age: Yup.number().required(t('ageRequired')),
    gender: Yup.string(),
    phoneNumber: Yup.string().required(t('phoneNumberRequired')),
    experience: Yup.number().required(t('experienceRequired')),
    speciality: Yup.array().min(1, t('specialityRequired')),
  });

  // Default values for form fields
  const defaultValues = useMemo(
    () => ({
      name: coach?.name || '',
      email: coach?.email || '',
      age: coach?.age || 30,
      gender: coach?.gender || 'male',
      phoneNumber: coach?.phoneNumber || '',
      experience: coach?.experience || 5,
      speciality: coach?.speciality || [],
    }),
    [coach]
  );

  const methods = useForm({
    resolver: yupResolver(editCoachSchema),
    defaultValues,
  });

  const {
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (coach) {
      reset(defaultValues);
    }
  }, [coach, defaultValues, reset]);

  const values = watch();

  const onSubmit = handleSubmit(
    async (data) => {
      try {
        console.log('🚀 ~ data:', data);
        // await updateCoach(coach.id, data);
        enqueueSnackbar(t('updateSuccess'));
      } catch (error) {
        console.error(error);
        enqueueSnackbar(t('somethingWentWrong'), {
          variant: 'error',
        });
      } finally {
        await mutate(endpoints.coach.get(coach.id));
        setIsEdit(false);
      }
    },
    (errors) => {
      console.error(errors);
    }
  );

  const handleResetValues = useCallback(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const handleCloseDrawer = useCallback(() => {
    handleResetValues();
    setIsEdit(false);
  }, [setIsEdit, handleResetValues]);

  return (
    <CustomBottomDrawer open={isEdit} onOpen={() => setIsEdit(true)} onClose={handleCloseDrawer}>
      <Container>
        <FormProvider methods={methods} onSubmit={onSubmit}>
          {fieldToBeEdited === 'age' && <AgeInput />}
          {/* {fieldToBeEdited === 'phoneNumber' && <PhoneNumberInput phoneNumber={values.phoneNumber} />}
          {fieldToBeEdited === 'experience' && <ExperienceInput experience={values.experience} />}
          {fieldToBeEdited === 'speciality' && <SpecialityInput speciality={values.speciality} />} */}
          {fieldToBeEdited === 'info' && (
            <NameEmailGenderInputs gender={values.gender} setValue={setValue} />
          )}

          <Stack>
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              fullWidth
              variant="contained"
              size="large"
            >
              {t('confirm')}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Container>
    </CustomBottomDrawer>
  );
}

CoachEditForm.propTypes = {
  coach: PropTypes.object,
  isEdit: PropTypes.bool,
  setIsEdit: PropTypes.func,
  fieldToBeEdited: PropTypes.string,
};
