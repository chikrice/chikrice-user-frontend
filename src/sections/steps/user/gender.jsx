import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import { useTranslate } from 'src/locales';
import gainWeightSrc from 'src/assets/illustrations/man.png';
import loseWeightSrc from 'src/assets/illustrations/girl.png';

export default function Gender({ gender, onNext }) {
  console.log(gender);

  const { t } = useTranslate();

  const genderOptions = [
    {
      title: t('female'),
      imgSrc: loseWeightSrc,
      value: 'female',
    },
    {
      title: t('male'),
      imgSrc: gainWeightSrc,
      value: 'male',
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h2" textAlign={'center'}>
        {t('gender')}
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
        {genderOptions.map((option) => (
          <Card
            key={option.value}
            onClick={() => onNext({ gender: option.value })}
            sx={{
              display: 'flex',
              alignItems: 'center',
              px: 2,
              py: 1,
              cursor: 'pointer',
              border: (theme) =>
                gender === option.value ? `solid 1px ${theme.palette.primary.main}` : '',
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 90 }}
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

Gender.propTypes = {
  gender: PropTypes.string,
  onNext: PropTypes.func,
};
