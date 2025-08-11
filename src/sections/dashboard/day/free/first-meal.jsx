import PropTypes from 'prop-types';
import { Card, CardContent, Container, Stack, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { useInitCustomMeal } from 'src/api/plan-day';

import { cardStyle, contentStyle } from '../common/styles';

export default function EnterFirstMeal({ planDayId }) {
  const initCustomMeal = useInitCustomMeal(planDayId);

  const { t } = useTranslate();
  return (
    <Container sx={{ pt: 2 }}>
      <Card style={cardStyle} onClick={initCustomMeal}>
        <CardContent style={contentStyle}>
          <Stack
            sx={{
              gap: 1,
              width: '100%',
              height: 150,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Iconify icon={'fa6-solid:plus'} width={30} />
            <Typography variant="h5">{t('enterFirstMeal')}</Typography>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

EnterFirstMeal.propTypes = {
  planDayId: PropTypes.string,
};
