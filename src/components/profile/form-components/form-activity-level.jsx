import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';
import { Card, CardContent, Stack, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';
import { activityOptions } from 'src/data/user';

import FormLayout from './form-layout';

export default function ActivityLevelInput({ activityLevel }) {
  const { t } = useTranslate();
  const { control, setValue } = useFormContext();

  const handleSelectActivity = (value) => {
    setValue('activityLevel', value);
  };

  return (
    <Controller
      name="activityLevel"
      control={control}
      defaultValue={activityLevel}
      render={() => (
        <FormLayout title={t('activityLevel')} description={t('editActivityLevel')}>
          <Stack
            sx={{
              maxWidth: 600,
              mx: 'auto',
            }}
            spacing={2}
          >
            {activityOptions.map((activity) => (
              <Card
                key={activity.value}
                onClick={() => handleSelectActivity(activity.value)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  border: (theme) =>
                    activity.value === activityLevel
                      ? `solid ${theme.palette.primary.main}`
                      : 'none',
                }}
              >
                <CardContent>
                  <Typography component="div" variant="h5">
                    {t(activity.title)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t(activity.subTitle)}
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

ActivityLevelInput.propTypes = {
  activityLevel: PropTypes.number.isRequired,
};
