import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Card, CardHeader, Divider, List, ListItem, ListItemText, Stack } from '@mui/material';

import Label from 'src/components/label';
import { useTranslate } from 'src/locales';
import { fDateRange } from 'src/utils/format-time';

export default function MilestoneOngoing({ milestone }) {
  const { t } = useTranslate();

  console.log(milestone);

  return (
    <Card
      className="progress__tour__2"
      sx={{
        p: 1,
        backgroundColor: (theme) => theme.palette.background.paper,
        boxShadow: (theme) => theme.customShadows.card,
      }}
    >
      <CardHeader
        title={t('month') + 1}
        sx={{ '&.MuiCardHeader_subhyeader': { direction: 'ltr' } }}
        subheader={fDateRange(milestone)}
      />
      <Stack sx={{ px: 2, pb: 2 }}>
        <List sx={{ color: 'text.secondary' }}>
          <StyledListItem>
            <ListItemText primary={t('startWeight')} />
            <Label>{milestone.startWeight}kg</Label>
          </StyledListItem>
          <Divider />
          <StyledListItem>
            <ListItemText primary={t('targetWeight')} />
            <Label>{milestone.targetWeight}kg</Label>
          </StyledListItem>
          <Divider />
          <StyledListItem>
            <ListItemText primary={t('baseCalories')} />
            <Label color="info">{milestone.baseCalories.toFixed()}cal</Label>
          </StyledListItem>
          <Divider />
          <StyledListItem sx={{ gap: 1 }}>
            <ListItemText primary={t('targetCalories')} />
            <Label
              color={milestone.changePoint ? 'default' : 'success'}
              sx={{ textDecoration: milestone.changePoint ? 'line-through' : '' }}
            >
              {milestone.targetCalories.toFixed()}cal
            </Label>
            {milestone.changePoint && (
              <Label color="success">{milestone.changePoint.targetCalories}cal</Label>
            )}
          </StyledListItem>
          <Divider />
          <StyledListItem>
            <ListItemText
              primary={
                milestone.calorieAdjustment.type === 'deficit'
                  ? t('clorieDeficit__day')
                  : t('clorieSurplus__day')
              }
            />
            <Label color="warning">{milestone.calorieAdjustment.day}cal</Label>
          </StyledListItem>
          {/* <Divider /> */}
          {/* <StyledListItem>
            <ListItemText
              primary={
                milestone.calorieAdjustment.type === 'deficit'
                  ? t('clorieDeficit_month')
                  : t('clorieSurplus_month')
              }
            />
            <Label>{milestone.calorieAdjustment.month}cal</Label>
          </StyledListItem> */}
        </List>
      </Stack>
    </Card>
  );
}

MilestoneOngoing.propTypes = { milestone: PropTypes.object };

const StyledListItem = styled(ListItem)(() => ({
  paddingLeft: 8,
  paddingRight: 8,
}));
