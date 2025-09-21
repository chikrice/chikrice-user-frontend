import { Alert, Stack, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';
import { fDate } from 'src/utils/format-time';

import type { Milestone } from 'chikrice-types';

// -------------------------------------

interface MilestoneAccomplishedProps {
  milestone: Milestone;
}

export default function MilestoneAccomplished({ milestone }: MilestoneAccomplishedProps) {
  const { t } = useTranslate();

  return (
    <Alert sx={{ mb: 3 }}>
      <Stack>
        <Typography variant="subtitle1">{t('month') + milestone.month}</Typography>
        <Typography variant="body2" color={'text.secondary'}>{`${fDate(
          milestone.startDate
        )} - ${fDate(milestone.endDate)}`}</Typography>
      </Stack>
    </Alert>
  );
}
