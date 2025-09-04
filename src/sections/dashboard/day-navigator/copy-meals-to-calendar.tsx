import { addDays } from 'date-fns';
import { DateCalendar } from '@mui/x-date-pickers';
import { Box, Stack, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';

// -------------------------------------

interface CopyMealsToCalendarProps {
  highlightedDate: Date;
  onCopyMeal: (date: Date) => void;
  totalDays: number;
}
const CopyMealsToCalendar = ({ highlightedDate, onCopyMeal, totalDays }: CopyMealsToCalendarProps) => {
  const { t } = useTranslate();

  return (
    <Stack>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'start', width: '320px', mx: 'auto', gap: 1 }}>
        <Iconify icon={'tabler:copy'} />
        <Typography variant="body1">{t('eatSameMeals')}</Typography>
      </Box>
      <DateCalendar
        value={highlightedDate}
        onChange={onCopyMeal}
        minDate={addDays(new Date(), 1)}
        maxDate={addDays(new Date(), totalDays - 1)}
      />
    </Stack>
  );
};

export default CopyMealsToCalendar;
