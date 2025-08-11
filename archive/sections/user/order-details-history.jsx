import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';

import { useTranslate } from 'src/locales';
import { fDateTime } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export default function OrderDetailsHistory({ history }) {
  const { t } = useTranslate();

  const ORDER_TIMELINE_OPTIONS = [
    { value: 7, label: t('orderisDelivered') },
    { value: 6, label: t('orderIsBeingDelivered') },
    { value: 5, label: t('packageInTransitToDestination') },
    { value: 4, label: t('packageHandedToShippingCarrier') },
    { value: 3, label: t('orderHasBeenPacked') },
    { value: 2, label: t('orderIsBeingProcessed') },
    { value: 1, label: t('orderHasBeenCreated') },
  ];

  const renderSummary = (
    <Stack
      spacing={2}
      component={Paper}
      variant="outlined"
      sx={{
        p: 2.5,
        minWidth: 260,
        flexShrink: 0,
        borderRadius: 2,
        typography: 'body2',
        borderStyle: 'dashed',
      }}
    >
      <Stack spacing={0.5}>
        <Box sx={{ color: 'text.disabled' }}>{t('orderTime')}</Box>
        {fDateTime(history?.orderTime)}
      </Stack>
      <Stack spacing={0.5}>
        <Box sx={{ color: 'text.disabled' }}>{t('paymentTime')}</Box>
        {fDateTime(history?.paymentTime)}
      </Stack>
      <Stack spacing={0.5}>
        <Box sx={{ color: 'text.disabled' }}>{t('deliveryTime')}</Box>
        {fDateTime(history?.deliveryTime) || '-----'}
      </Stack>
      <Stack spacing={0.5}>
        <Box sx={{ color: 'text.disabled' }}>{t('completionTime')}</Box>
        {fDateTime(history?.complitionTime) || '-----'}
      </Stack>
    </Stack>
  );

  const renderTimeline = (
    <Timeline
      sx={{
        p: 0,
        m: 0,
        [`& .${timelineItemClasses.root}:before`]: {
          flex: 0,
          padding: 0,
        },
      }}
    >
      {ORDER_TIMELINE_OPTIONS.map((item) => {
        const firstTimeline = item.value === history.timeline;

        const lastTimeline = item.value === history.timeline + 1;
        if (item.value <= history.timeline) {
          return (
            <TimelineItem key={item.value}>
              <TimelineSeparator>
                <TimelineDot color={(firstTimeline && 'primary') || 'grey'} />
                {lastTimeline ? null : <TimelineConnector />}
              </TimelineSeparator>

              <TimelineContent>
                <Typography variant="subtitle2">{item.label}</Typography>

                <Box sx={{ color: 'text.disabled', typography: 'caption', mt: 0.5 }}>
                  {fDateTime(item.time)}
                </Box>
              </TimelineContent>
            </TimelineItem>
          );
        }
      })}
    </Timeline>
  );

  return (
    <Card>
      <CardHeader title="History" />
      <Stack
        spacing={3}
        alignItems={{ md: 'flex-start' }}
        direction={{ xs: 'column-reverse', md: 'row' }}
        sx={{ p: 3 }}
      >
        {renderTimeline}

        {renderSummary}
      </Stack>
    </Card>
  );
}

OrderDetailsHistory.propTypes = {
  history: PropTypes.object,
};
