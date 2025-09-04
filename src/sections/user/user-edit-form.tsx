import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { Container, Stack } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useCallback } from 'react';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import FormProvider from 'src/components/hook-form';
import CustomBottomDrawer from 'src/components/custom-drawer';
import AgeInput from 'src/components/profile/form-components/form-age';
import WeightInput from 'src/components/profile/form-components/form-weight';
import HeightInput from 'src/components/profile/form-components/form-height';
import AllergySelectionInput from 'src/components/profile/form-components/form-allergy';
import ActivityLevelInput from 'src/components/profile/form-components/form-activity-level';
import GoalAchievementInput from 'src/components/profile/form-components/goal-achievement-speed';
import NameEmailGenderInputs from 'src/components/profile/form-components/form-name-email-gender';

import type { UserClient } from 'chikrice-types';

// -------------------------------------

interface UserEditFormProps {
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
  fieldToBeEdited: string;
}

export default function UserEditForm({ isEdit, setIsEdit, fieldToBeEdited }: UserEditFormProps) {
  const { t } = useTranslate();

  const { user, refreshUserInfo, updateUser } = useStore((state) => state);

  const editUserSchema = Yup.object().shape({
    gender: Yup.string(),
    allergicFoods: Yup.array(),
    currentWeight: Yup.number().min(30, t('minWeight')).max(300, t('maxWeight')),
    activityLevel: Yup.number(),
    goalAchievementSpeed: Yup.string(),
    age: Yup.number().min(13, t('minAge')).max(120, t('maxAge')).required(t('ageRequired')),
    height: Yup.number().min(80, t('minHeight')).max(250, t('maxHeight')).required(t('heightRequired')),
    name: Yup.string().required(t('fullNameRequired')),
    email: Yup.string().email(t('emailInvalid')).required(t('emailRequired')),
    targetWeight: Yup.number(),
  });

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
    async (data: Partial<UserClient>) => {
      try {
        await updateUser(data);
        enqueueSnackbar(t('updateSuccess'));
      } catch (error) {
        console.log(error);
        enqueueSnackbar(t('somethingWentWrong'), {
          variant: 'error',
        });
      } finally {
        await refreshUserInfo(user.id);
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
          {fieldToBeEdited === 'activityLevel' && <ActivityLevelInput activityLevel={values.activityLevel} />}
          {fieldToBeEdited === 'allergy' && <AllergySelectionInput allergicFoods={values.allergicFoods} />}
          {fieldToBeEdited === 'info' && <NameEmailGenderInputs gender={values.gender} setValue={setValue} />}
          {fieldToBeEdited === 'goalAchievementSpeed' && (
            <GoalAchievementInput goalAchievementSpeed={values.goalAchievementSpeed} />
          )}
          <Stack>
            <LoadingButton type="submit" loading={isSubmitting} fullWidth variant="contained" size="large">
              {t('confirm')}
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Container>
    </CustomBottomDrawer>
  );
}
