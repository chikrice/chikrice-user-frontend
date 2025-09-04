import { Card, Divider, List, ListItem, ListItemIcon, ListItemText, Radio, Stack } from '@mui/material';

import Label from 'src/components/label';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import ProgressChart from 'src/components/progress-chart';

import type { Overview } from 'chikrice-types';

// -------------------------------------

interface RoadmapOverviewProps {
  overview: Overview;
}

export default function RoadmapOverview({ overview }: RoadmapOverviewProps) {
  const { t } = useTranslate();
  return (
    <Card
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        boxShadow: (theme) => theme.customShadows.card,
      }}
    >
      <ProgressChart weightProgression={overview?.weightProgression} />
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
        </List>
      </Stack>
    </Card>
  );
}
