import PropTypes from 'prop-types';
import { arSA, enUS } from 'date-fns/locale';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import { useLocales, useTranslate } from 'src/locales';
import { fDate, isDateisToday } from 'src/utils/format-time';

const NavigationContent = ({ planMonth, onNavigateTo }) => {
  const { t } = useTranslate();
  const { lang } = useLocales();

  return (
    <Stack>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'start', width: '320px', mx: 'auto', gap: 1 }}>
        <Iconify icon={'solar:calendar-outline'} />
        <Typography variant="body1">{t('navigateTo')}</Typography>
      </Box>
      <Stack sx={{ p: 2 }} spacing={1}>
        {planMonth?.map((week, index) => (
          <Stack spacing={1} key={index}>
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {t('week')} {week.weekNumber}
              </Typography>
              <Grid container spacing={1} textAlign={'center'}>
                {week.days.map((day) => (
                  <Grid item xs={1.7} sm={2} md={1.5} key={day.date}>
                    <Box
                      onClick={() => onNavigateTo(day.number)}
                      sx={{
                        p: 1,
                        mb: 1,
                        borderRadius: 2,
                        background: (theme) => theme.palette.card.default,
                        border: (theme) =>
                          isDateisToday(day.date) ? `1px dashed ${theme.palette.primary.main}` : '',
                        color: 'text.secondary',
                      }}
                    >
                      <Typography variant="body2" fontWeight={'500'}>
                        {fDate(day.date, 'EEE', { locale: lang === 'en' ? enUS : arSA })}
                      </Typography>
                      <small>{day.number}</small>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
            {week.weekNumber !== 5 && <Divider sx={{ borderStyle: 'dashed' }} />}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default NavigationContent;

NavigationContent.propTypes = {
  planMonth: PropTypes.array,
  onNavigateTo: PropTypes.func,
};
