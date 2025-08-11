import { useCallback, useState } from 'react';
import { Container, Stack } from '@mui/material';

import useStore from 'src/store';
// import ContinueTour from 'src/components/welcome-guide/continue-tour';
// import { useTourContext } from 'src/context/hooks/use-tour-hook';
import { useTranslate } from 'src/locales';
import { useGetCoach } from 'src/api/coach';
import { LoadingScreen } from 'src/components/loading-screen';
import ProfileBody from 'src/components/profile/profile-body';
import ProfileHeader from 'src/components/profile/profile-header';

import CoachEditForm from '../coach-edit-form';

// ----------------------------------------------------------------------

export default function CoachProfileView() {
  const { t } = useTranslate();

  const { user } = useStore();

  const { coach, isLoading, error } = useGetCoach(user.id);

  const [isEdit, setIsEdit] = useState(false);
  const [fieldName, setFieldName] = useState('info');

  const handleEdit = useCallback(
    (value) => {
      setIsEdit(true);
      setFieldName(value);
    },
    [setIsEdit, setFieldName]
  );

  if (isLoading) return <LoadingScreen />;
  if (error) return <div>error</div>;

  const coachFields = [
    {
      id: 4,
      name: 'age',
      title: 'age',
      value: coach?.age,
      translatedValue: coach?.age + ' ' + t('years'),
      icon: 'ageSrc',
    },
  ];

  return (
    <>
      <Container sx={{ mb: 10 }}>
        <Stack spacing={1}>
          <ProfileHeader
            name={coach.name}
            email={coach.email}
            picture={coach.picture}
            gender={coach.gender}
            onEdit={() => handleEdit('info')}
          />

          <ProfileBody fields={coachFields} onEdit={handleEdit} />
        </Stack>
      </Container>

      <CoachEditForm
        coach={coach}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
        fieldToBeEdited={fieldName}
      />
    </>
  );
}
