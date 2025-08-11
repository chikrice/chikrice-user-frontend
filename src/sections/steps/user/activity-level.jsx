import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { useTranslate } from 'src/locales';
import { activityOptions } from 'src/data/user';

export default function ActivityLevel({ activityLevel, onNext }) {
  const { t } = useTranslate();

  return (
    <Box sx={{ width: '100%', pb: 20 }}>
      <Typography variant="h2" textAlign={'center'}>
        {t('activity')}
      </Typography>
      <Stack
        sx={{
          mt: 3,
          maxWidth: 600,
          mx: 'auto',
        }}
        spacing={2}
      >
        {activityOptions.map((option) => (
          <Card
            key={option.value}
            onClick={() => onNext({ activityLevel: option.value })}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              border: (theme) =>
                activityLevel === option.value ? `solid 1px ${theme.palette.primary.main}` : '',
            }}
          >
            <CardContent>
              <Typography component="div" variant="h5">
                {t(option.title)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t(option.subTitle)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}

ActivityLevel.propTypes = {
  activityLevel: PropTypes.number,
  onNext: PropTypes.func,
};
