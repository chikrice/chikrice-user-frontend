//import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import {
  Avatar,
  Button,
  Stack,
  Divider,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import useStore from 'src/store';
import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { useGetCoachClient } from 'src/api/coach';
import { useParams, useRouter } from 'src/routes/hooks';
import { LoadingScreen } from 'src/components/loading-screen';

const StyledButton = styled(Button)(() => ({
  width: 110,
  height: 65,
  gap: 2,
  borderRadius: 16,
  flexDirection: 'column',
}));

export default function CoachClientView() {
  const { user: coach, initUserRoadmap } = useStore();
  const { clientId } = useParams();
  const { client, isLoading, error } = useGetCoachClient(coach.id, clientId);

  const { t } = useTranslate();
  const router = useRouter();

  if (isLoading) return <LoadingScreen />;
  if (error) return <div>error</div>;

  // Define user details to loop over
  const userDetails = [
    { icon: 'tabler:gender-male', label: t('gender'), value: client.gender },
    { icon: 'ic:outline-cake', label: t('age'), value: client.age },
    { icon: 'ic:outline-height', label: t('height'), value: `${client.height} cm` },
    { icon: 'mdi:weight-kilogram', label: t('startWeight'), value: `${client.startWeight} kg` },
    { icon: 'mdi:weight-lifter', label: t('currentWeight'), value: `${client.currentWeight} kg` },
    {
      icon: 'ic:baseline-trending-up',
      label: t('targetWeight'),
      value: `${client.targetWeight} kg`,
    },
    {
      icon: 'ic:outline-fitness-center',
      label: t('activityLevel'),
      value: client.activityLevel + '/6',
    },
    {
      icon: 'ic:baseline-sports-gymnastics',
      label: t('weightLifting'),
      value: client.isWeightLifting ? t('yes') : t('no'),
    },
    {
      icon: 'ic:baseline-speed',
      label: t('goalAchievementSpeed'),
      value: client.goalAchievementSpeed,
    },
  ];

  const handleNavigation = async (path) => {
    await initUserRoadmap(client.roadmapId);
    router.push(path);
  };

  return (
    <Stack alignItems="center" sx={{ padding: 2 }}>
      {/* Avatar and Name */}
      <Box>
        <Avatar
          src={client.picture}
          alt={client.name}
          sx={{ width: 100, height: 100, marginBottom: 2, mx: 'auto' }}
        />
        <Typography variant="h4" textAlign="center">
          {client.name}
        </Typography>
      </Box>

      {/* Buttons */}
      <Stack direction="row" spacing={2} mt={2}>
        <StyledButton
          variant="outlined"
          onClick={() => handleNavigation(paths.dashboard(client.id))}
        >
          <Iconify icon="hugeicons:dashboard-square-03" />
          {t('dashboard')}
        </StyledButton>
        <StyledButton variant="outlined" onClick={() => handleNavigation(paths.progress)}>
          <Iconify icon="hugeicons:analytics-up" />
          {t('progress')}
        </StyledButton>
      </Stack>

      {/* Divider */}
      <Divider sx={{ width: '100%', mt: 3 }} />

      {/* User Details List */}
      <List sx={{ width: '100%' }}>
        {userDetails.map((item, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <Iconify icon={item.icon} />
            </ListItemIcon>
            <ListItemText primary={item.label} secondary={item.value} />
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

//CoachClientView.propTypes = {}
