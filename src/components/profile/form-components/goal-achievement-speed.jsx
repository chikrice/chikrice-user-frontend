import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { Card, CardContent, Stack, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';
import slowSrc from 'src/assets/icons/slow.png';
import fastSrc from 'src/assets/icons/fast.png';
import recommendedSrc from 'src/assets/icons/recommended.png';

import FormLayout from './form-layout';

export default function GoalAchievementInput({ goalAchievementSpeed }) {
  const { t } = useTranslate();
  const { control, setValue } = useFormContext();

  console.log(goalAchievementSpeed);

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

  const handleSelectSpeed = (value) => {
    setValue('goalAchievementSpeed', value);
  };

  return (
    <Controller
      name="goalAchievementSpeed"
      control={control}
      defaultValue={goalAchievementSpeed}
      render={() => (
        <FormLayout title={t('goalAchievementSpeed')} description={t('editSpeed')}>
          <Stack
            sx={{
              maxWidth: 600,
              mx: 'auto',
            }}
            spacing={2}
          >
            {speedOptions.map((speed) => (
              <Card
                key={speed.value}
                onClick={() => handleSelectSpeed(speed.value)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  border: (theme) =>
                    speed.value === goalAchievementSpeed
                      ? `solid ${theme.palette.primary.main}`
                      : 'none',
                }}
              >
                <CardContent>
                  <Typography component="div" variant="h5">
                    {speed.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {speed.subTitle}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </FormLayout>
      )}
    />
  );
}

GoalAchievementInput.propTypes = {
  goalAchievementSpeed: PropTypes.string.isRequired,
};
