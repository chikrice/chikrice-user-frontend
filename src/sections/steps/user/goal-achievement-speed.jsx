import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { useTranslate } from 'src/locales';
import slowSrc from 'src/assets/icons/slow.png';
import fastSrc from 'src/assets/icons/fast.png';
import recommendedSrc from 'src/assets/icons/recommended.png';

export default function GoalAchievementSpeed({ speed, onNext }) {
  const { t } = useTranslate();

  const speedOptions = [
    {
      id: 1,
      title: t('slow'),
      subTitle: t('slowSpeed'),
      imgSrc: slowSrc,
      value: 'slow',
    },
    {
      id: 2,
      title: t('recommended'),
      subTitle: t('recommendedSpeed'),
      imgSrc: recommendedSrc,
      value: 'recommended',
    },
    {
      id: 3,
      title: t('fast'),
      subTitle: t('fastSpeed'),
      imgSrc: fastSrc,
      value: 'fast',
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h2" textAlign={'center'}>
        {t('howFastAchieveGoal')}?
      </Typography>
      <Stack
        sx={{
          mt: 3,
          maxWidth: 600,
          mx: 'auto',
          justifyContent: 'center',
          minHeight: { xs: 'calc(100svh - 300px)', md: 'unset' },
        }}
        spacing={2}
      >
        {speedOptions.map((option) => (
          <Card
            key={option.id}
            onClick={() => onNext({ goalAchievementSpeed: option.value })}
            sx={{
              display: 'flex',
              alignItems: 'center',
              pl: 2,
              border: (theme) =>
                speed === option.value ? `solid 1px ${theme.palette.primary.main}` : '',
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 50 }}
              image={option.imgSrc}
              alt={option.title}
            />
            <CardContent>
              <Typography component="div" variant="h5">
                {option.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {option.subTitle}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

GoalAchievementSpeed.propTypes = {
  speed: PropTypes.string,
  onNext: PropTypes.func,
};
