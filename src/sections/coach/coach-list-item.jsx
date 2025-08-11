import { mutate } from 'swr';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { styled } from '@mui/system';
import { Box, Button, Stack, Typography, Rating, Card } from '@mui/material';

import useStore from 'src/store';
import Image from 'src/components/image';
import Label from 'src/components/label';
import { useTranslate } from 'src/locales';
import { endpoints } from 'src/utils/axios';
import { initCoachCollab } from 'src/api/user';
import coachSrc from 'src/assets/images/coach.jpg';

const CompactCoachItem = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  height: 210,
  borderRadius: 0,
  //   padding: theme.spacing(2),
}));

const FullCoachItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2, 0),
  alignItems: 'flex-start',
}));

export default function CoachListItem({ view, coach }) {
  const { user } = useStore();

  const handleWorkWith = useCallback(async () => {
    try {
      await initCoachCollab(user.id, { coachId: coach.id });
      mutate(endpoints.coach.list);
    } catch (error) {
      console.error(error);
    }
  }, [coach, user]);

  const isCompact = view === 'compact';
  const WrapperComponent = isCompact ? CompactCoachItem : FullCoachItem;
  const { t } = useTranslate();

  return (
    <WrapperComponent>
      <Image
        src={coachSrc}
        sx={{
          width: isCompact ? '35%' : '100%',
        }}
      />

      <Stack spacing={1} px={2}>
        <Typography variant={isCompact ? 'h4' : 'h2'}>{coach.name}</Typography>
        <Stack spacing={0.5}>
          <Typography variant="body2">
            {t('experience')}: {coach.experience} {t('years')}
          </Typography>{' '}
          <Typography variant="body2">
            {t('specialty')}: <Label>asdf</Label>
          </Typography>
          <Rating name="coach-rating" value={4.5} readOnly size="small" />
        </Stack>
        <Button
          variant="contained"
          size={isCompact ? 'small' : 'medium'}
          sx={{ mt: 1, width: 'fit-content ' }}
          onClick={handleWorkWith}
        >
          {t('workWith')}
        </Button>
      </Stack>
    </WrapperComponent>
  );
}

CoachListItem.propTypes = {
  view: PropTypes.string.isRequired,
  coach: PropTypes.object.isRequired,
};
