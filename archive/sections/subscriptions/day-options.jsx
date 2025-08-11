import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Stack from '@mui/material/Stack';
import { useTheme } from '@emotion/react';

import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';

const dayOptions = [7, 14, 27];

export default function DayOptions({ activeDay, setActiveDay }) {
  const theme = useTheme();
  const { t } = useTranslate();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'right',
        pr: 2,
        my: 2,
        color: theme.palette.text.disabled,
      }}
    >
      <Stack
        className={'subs__tour__2'}
        spacing={1}
        sx={{ flexDirection: 'row', alignItems: 'center' }}
      >
        {dayOptions.map((option) => (
          <StyledDayOption
            key={option}
            sx={{ fontSize: '12px', fontWeight: 'bold' }}
            isActive={activeDay === option}
            onClick={() => setActiveDay(option)}
          >
            {option} {t('day')}
          </StyledDayOption>
        ))}
        <Iconify icon={'solar:calendar-date-broken'} width={24} />
      </Stack>
    </Box>
  );
}

DayOptions.propTypes = {
  activeDay: PropTypes.number,
  setActiveDay: PropTypes.func,
};

const StyledDayOption = styled(Box, { shouldForwardProp: (prop) => prop !== 'isActive' })(
  ({ theme, isActive }) => ({
    borderRadius: 16,
    backgroundColor: isActive ? theme.palette.card.default : '',
    color: isActive ? theme.palette.primary.main : '',
    padding: '5px 9px ',
  })
);
