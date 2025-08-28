import { isToday, parseISO } from 'date-fns';
import { arSA, enUS, faIR } from 'date-fns/locale';
import { Box, Grid, Stack, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';
import { fDate } from 'src/utils/format-time';
import { useLocales, useTranslate } from 'src/locales';

import type { PlanReference } from 'chikrice-types';

// -------------------------------------
interface NavigationContentProps {
  plans: PlanReference[];
  onNavigateTo: (day: number) => Promise<void>;
}

const LOCALE_MAP = {
  en: enUS,
  ar: arSA,
  fa: faIR,
};

// Helper function to safely parse date
const parseDate = (date: string | Date) => {
  if (typeof date === 'string') {
    return parseISO(date);
  }
  return date;
};

// -------------------------------------

const NavigationContent = ({ plans, onNavigateTo }: NavigationContentProps) => {
  const { t } = useTranslate();
  const { lang } = useLocales();

  return (
    <Stack>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'start', width: '320px', mx: 'auto', gap: 1 }}>
        <Iconify icon={'solar:calendar-outline'} />
        <Typography variant="body1">{t('navigateTo')}</Typography>
      </Box>
      <Stack sx={{ p: 2 }} spacing={1}>
        <Grid container spacing={1} textAlign={'center'}>
          {plans?.map((plan, index) => (
            <Grid item xs={1.7} sm={2} md={1.5} key={plan._id}>
              <Box
                onClick={() => onNavigateTo(index + 1)}
                sx={{
                  p: 1,
                  mb: 1,
                  borderRadius: 2,
                  background: (theme) => theme.palette.card.soft,
                  border: (theme) =>
                    isToday(parseDate(plan.date)) ? `1px dashed ${theme.palette.primary.main}` : '',
                  color: 'text.secondary',
                  cursor: 'pointer',
                  '&:hover': {
                    background: (theme) => theme.palette.action.hover,
                  },
                }}
              >
                <Typography variant="body2" fontWeight={'500'} noWrap>
                  {fDate(parseDate(plan.date), 'EEE', { locale: LOCALE_MAP[lang] })}
                </Typography>
                <small>{index + 1}</small>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  );
};

export default NavigationContent;
