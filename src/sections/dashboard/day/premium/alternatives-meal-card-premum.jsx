import PropTypes from 'prop-types';
import { Box, Card, Stack, Typography } from '@mui/material';

import Image from 'src/components/image';

export default function AlternativesMealCard({ meal, onClick }) {
  return (
    <Card onClick={() => onClick(meal)}>
      <Box sx={{ py: 1.3, px: 2, display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '60%' }}>
          <Typography variant="h5">{meal.name.ar}</Typography>
          <Typography variant="body2" color={'text.secondary'}>
            {meal.name.en}
          </Typography>
        </Box>
        <Stack
          sx={{
            width: '40%',
          }}
        >
          <Image
            src={meal.imgUrl}
            alt={'meal'}
            sx={{
              width: '50%',
              mx: 'auto',
              ratio: '1/1',
            }}
          />
          <Typography
            variant="body2"
            color={'text.secondary'}
            sx={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            {meal.calorie} cal
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
}

AlternativesMealCard.propTypes = {
  meal: PropTypes.object,
  onClick: PropTypes.func,
};
