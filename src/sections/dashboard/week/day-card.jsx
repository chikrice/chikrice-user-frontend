import PropTypes from 'prop-types';
import { Box, Card, Checkbox, Stack, Typography } from '@mui/material';

import { fDate, isDateisToday, isPastDate } from 'src/utils/format-time';

export default function DayCard({ id, number, date, onClickDay }) {
  const isToday = isDateisToday(date);

  const isChecked = isPastDate(date);

  return (
    <Card
      sx={{ py: 2, px: 3, border: isToday ? 'solid 1px ' : 'none' }}
      onClick={() => onClickDay({ id, number })}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textTransform: 'capitalize',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Checkbox checked={isChecked} />
          <Stack>
            <span style={{ fontWeight: 'bold' }}>{name}</span>
            <Typography variant="subtitle2" color={'text.secondary'}>
              {fDate(date, 'dd MMM')}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Card>
  );
}

DayCard.propTypes = {
  id: PropTypes.string,
  number: PropTypes.number,
  name: PropTypes.string,
  date: PropTypes.string,
  onClickDay: PropTypes.func,
};
