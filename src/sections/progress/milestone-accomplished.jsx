import PropTypes from 'prop-types';
import { Alert, Stack, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';
import { fDate } from 'src/utils/format-time';

export default function MilestoneAccomplished({ milestone }) {
  const { t } = useTranslate();

  return (
    <Alert>
      <Stack>
        <Typography variant="subtitle1">{t('month') + milestone.month}</Typography>
        <Typography variant="body2" color={'text.secondary'}>{`${fDate(
          milestone.startDate
        )} - ${fDate(milestone.endDate)}`}</Typography>
      </Stack>
    </Alert>
  );
}

MilestoneAccomplished.propTypes = {
  milestone: PropTypes.object,
};
