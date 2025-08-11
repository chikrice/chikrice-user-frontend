import * as Yup from 'yup';
import { mutate } from 'swr';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
// import axios, { endpoints } from 'src/utils/axios';
import { enqueueSnackbar } from 'notistack';
import { Container, Stack } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
// import { useSnackbar } from 'notistack';
import { useMemo, useEffect, useCallback } from 'react';

import { updateUser } from 'src/api/user';
import { useTranslate } from 'src/locales';
import { endpoints } from 'src/utils/axios';
import { useBoolean } from 'src/hooks/use-boolean';
import FormProvider from 'src/components/hook-form';
import AgeInput from 'src/components/profile/form-components/form-age';
import CustomBottomDrawer from 'src/components/custom-drawer/custom-drawer';
import WeightInput from 'src/components/profile/form-components/form-weight';
import HeightInput from 'src/components/profile/form-components/form-height';
import AllergySelectionInput from 'src/components/profile/form-components/form-allergy';
import ActivityLevelInput from 'src/components/profile/form-components/form-activity-level';
import GoalAchievementInput from 'src/components/profile/form-components/goal-achievement-speed';
import NameEmailGenderInputs from 'src/components/profile/form-components/form-name-email-gender';

import useAddressBook from './hooks/address-book';
import UpdatePasswordForm from '../auth/update-password-form';
// ----------------------------------------------------------------------

export default function UserEditForm({ user, isEdit, setIsEdit, fieldToBeEdited }) {
  const { t } = useTranslate();
  // const { enqueueSnackbar } = useSnackbar();

  const { handleUpdateUser } = useAddressBook();

  const editUserSchema = Yup.object().shape({
    gender: Yup.string(),
    allergicFood: Yup.array(),
    currentWeight: Yup.number(),
    activityLevel: Yup.number(),
    goalAchievementSpeed: Yup.string(),
    age: Yup.number().required(t('ageRequired')),
    height: Yup.number().required(t('heightRequired')),
    name: Yup.string().required(t('fullNameRequired')),
    email: Yup.string().email(t('emailInvalid')).required(t('emailRequired')),
  });

  const updatePasswordForm = useBoolean();

  const defaultValues = useMemo(
    () => ({
      name: user?.name,
      email: user?.email,
      height: user?.height,
      age: user?.age || 26,
      gender: user?.gender || 'male',
      targetWeight: user?.targetWeight,
      currentWeight: user?.currentWeight,
      activityLevel: user?.activityLevel,
      allergicFoods: user?.allergicFoods || [],
      goalAchievementSpeed: user?.goalAchievementSpeed,
    }),
    [user]
  );

  const methods = useForm({
    resolver: yupResolver(editUserSchema),
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
    if (user) {
      reset(defaultValues);
    }
  }, [user, defaultValues, reset]);

  const values = watch();

  const onSubmit = handleSubmit(
    async (data) => {
      try {
        await updateUser(user.id, data);
        enqueueSnackbar(t('updateSuccess'));
      } catch (error) {
        console.log(error);
        enqueueSnackbar(t('somethingWentWrong'), {
          variant: 'error',
        });
      } finally {
        await mutate(endpoints.user.get(user.id));
        await mutate(endpoints.roadmap.root(user.roadmapId));
        setIsEdit(false);
      }
    },
    (errors) => {
      console.log(errors);
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
          {fieldToBeEdited === 'currentWeight' && <WeightInput />}
          {fieldToBeEdited === 'height' && <HeightInput />}
          {fieldToBeEdited === 'activityLevel' && (
            <ActivityLevelInput activityLevel={values.activityLevel} />
          )}
          {fieldToBeEdited === 'allergy' && (
            <AllergySelectionInput allergicFoods={values.allergicFoods} />
          )}
          {fieldToBeEdited === 'info' && (
            <NameEmailGenderInputs gender={values.gender} setValue={setValue} />
          )}
          {fieldToBeEdited === 'goalAchievementSpeed' && (
            <GoalAchievementInput goalAchievementSpeed={values.goalAchievementSpeed} />
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

        <UpdatePasswordForm
          open={updatePasswordForm.value}
          onClose={updatePasswordForm.onFalse}
          onCreate={handleUpdateUser}
        />
      </Container>
    </CustomBottomDrawer>
  );
}

UserEditForm.propTypes = {
  user: PropTypes.object,
  isEdit: PropTypes.bool,
  setIsEdit: PropTypes.func,
  fieldToBeEdited: PropTypes.string,
};
