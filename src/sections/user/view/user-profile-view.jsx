import { useCallback, useState } from 'react';
import { Container, Stack } from '@mui/material';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import ageSrc from 'src/assets/icons/age.png';
// import { Address } from 'src/sections/address';
import { activityOptions } from 'src/data/user';
import weightSrc from 'src/assets/icons/weight.png';
import heightSrc from 'src/assets/icons/height.png';
import allergySrc from 'src/assets/icons/allergy.png';
import activitySrc from 'src/assets/icons/activity.png';
import recommendedSrc from 'src/assets/icons/recommended.png';
import { LoadingScreen } from 'src/components/loading-screen';
import ProfileBody from 'src/components/profile/profile-body';
import ProfileHeader from 'src/components/profile/profile-header';

import UserGoal from '../user-goal';
import UserEditForm from '../user-edit-form';

// ----------------------------------------------------------------------

export default function UserProfileView() {
  const { t } = useTranslate();

  const { user, isAuthLoading, authError } = useStore();

  const [isEdit, setIsEdit] = useState(false);
  const [fieldName, setFieldName] = useState('info');

  const handleEdit = useCallback(
    (value) => {
      setIsEdit(true);
      setFieldName(value);
    },
    [setIsEdit, setFieldName]
  );

  if (isAuthLoading) return <LoadingScreen />;
  if (authError) return <div>error</div>;

  const userFields = [
    {
      id: 1,
      name: 'currentWeight',
      title: 'currentWeight',
      value: user?.currentWeight,
      translatedValue: user?.currentWeight + ' ' + t('kg'),
      icon: weightSrc,
    },
    {
      id: 3,
      name: 'height',
      title: 'height',
      value: user?.height,
      translatedValue: user?.height + ' ' + t('cm'),
      icon: heightSrc,
    },
    {
      id: 4,
      name: 'age',
      title: 'age',
      value: user?.age,
      translatedValue: user?.age + ' ' + t('years'),
      icon: ageSrc,
    },
    {
      id: 5,
      name: 'activityLevel',
      title: 'activity',
      value: user?.activityLevel,
      translatedValue: t(activityOptions[user?.activityLevel - 1]?.title),
      icon: activitySrc,
    },
    {
      id: 2,
      name: 'goalAchievementSpeed',
      title: 'speed',
      value: user?.goalAchievementSpeed,
      translatedValue: t(user?.goalAchievementSpeed),
      icon: recommendedSrc,
    },
    {
      id: 6,
      name: 'allergy',
      title: 'allergy',
      value: [{ item: 1 }],
      translatedValue: user?.allergicFoods.length + ' ' + t('ingredients'),
      icon: allergySrc,
    },
  ];

  return (
    <>
      <Container sx={{ mb: 10 }}>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <ProfileHeader
              name={user.name}
              email={user.email}
              picture={user.picture}
              gender={user.gender}
              onEdit={() => handleEdit('info')}
            />

            <ProfileBody fields={userFields} onEdit={handleEdit} />
          </Stack>

          <UserGoal user={user} />
          {/* <Address /> */}
        </Stack>
      </Container>

      <UserEditForm isEdit={isEdit} setIsEdit={setIsEdit} fieldToBeEdited={fieldName} />
    </>
  );
}
