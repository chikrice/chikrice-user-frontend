import { useState } from 'react';
import { Box, Card, Popover, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';
import { fDate } from 'src/utils/format-time';

import StreakBox from './streak-box';

import type { ActivityLog } from 'chikrice-types';

// -------------------------------------

interface StreakTableProps {
  totalDays: number;
  activityLog: ActivityLog[];
  onGoingDay: number;
}

export default function StreakTable({ totalDays, activityLog, onGoingDay }: StreakTableProps) {
  const { t } = useTranslate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [streakInfo, setStreakInfo] = useState({ date: '', percentage: 0 });

  const handlePopoverOpen = (event, logEntry) => {
    if (logEntry) {
      setStreakInfo({
        date: fDate(logEntry.date),
        percentage: logEntry.completionPercentage || 0,
      });
    } else {
      setStreakInfo({
        date: t('noData'),
        percentage: 0,
      });
    }
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Card
      className="progress__tour__3"
      sx={{
        p: 2.5,
        backgroundColor: (theme) => theme.palette.background.paper,
        boxShadow: (theme) => theme.customShadows.card,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Typography variant="h3">{t('streks')}</Typography>
        <Typography variant="subtitle2" color={'text.secondary'}>
          {onGoingDay}/{totalDays}🔥
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          width: '100%',
          scrollSnapType: 'x mandatory',
          '::-webkit-scrollbar': { display: 'none' },
          pr: 3,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateRows: 'repeat(7, 1fr)',
            gridAutoFlow: 'column',
            gap: 0.5,
          }}
        >
          {[...Array(totalDays)].map((_, index) => {
            const logEntry = activityLog[index];
            const completionPercentage = logEntry?.completionPercentage || 0;

            return (
              <StreakBox
                key={index}
                completionPercentage={completionPercentage}
                onMouseEnter={(e) => handlePopoverOpen(e, logEntry)}
                onMouseLeave={handlePopoverClose}
              />
            );
          })}
        </Box>

        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <Box sx={{ p: 1 }}>
            <Typography variant="body2">
              {streakInfo.date}
              {streakInfo.percentage > 0 && (
                <Typography
                  component="span"
                  variant="body2"
                  color="success.main"
                  sx={{ ml: 1, fontWeight: 'bold' }}
                >
                  {streakInfo.percentage.toFixed(0)}%
                </Typography>
              )}
            </Typography>
          </Box>
        </Popover>
      </Box>
    </Card>
  );
}
