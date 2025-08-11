import PropTypes from 'prop-types';
import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Radio,
  Stack,
} from '@mui/material';

import Label from 'src/components/label';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import ProgressChart from 'src/components/progress-chart';

export default function RoadmapOverview({ overview }) {
  const { t } = useTranslate();
  return (
    <Card
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        boxShadow: (theme) => theme.customShadows.card,
      }}
    >
      <ProgressChart
        weightProgression={overview?.weightProgression}
        className="progress__tour__1"
      />
      <Stack sx={{ p: 3 }}>
        <List sx={{ color: 'text.secondary' }}>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <Radio color="error" checked={true} />
            </ListItemIcon>
            <ListItemText primary={t('startWeight')} />
            <Label>{overview?.startWeight}kg</Label>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon>
              <Radio color="info" checked={true} />
            </ListItemIcon>
            <ListItemText primary={t('targetWeight')} />
            <Label>{overview?.targetWeight}kg</Label>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemIcon sx={{ width: '36px' }}>
              <Iconify icon="solar:calendar-date-broken" sx={{ mx: 'auto' }} />
            </ListItemIcon>
            <ListItemText primary={t('monthsNumber')} />
            <Label>{overview?.totalMonths}</Label>
          </ListItem>
          {/* <Divider />
          <ListItem>
            <ListItemIcon sx={{ width: '36px' }}>
              <Iconify icon="tabler:square-rounded-number-1" sx={{ mx: 'auto' }} />
            </ListItemIcon>
            <ListItemText primary={t('daysNumber')} />
            <Label>{overview?.totalDays}</Label>
          </ListItem> */}
        </List>
      </Stack>
    </Card>
  );
}

RoadmapOverview.propTypes = {
  overview: PropTypes.object,
};
