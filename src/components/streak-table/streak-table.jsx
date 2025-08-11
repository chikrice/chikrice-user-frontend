import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Popover, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';
import { fDate } from 'src/utils/format-time';

export default function StreakTable({ totalDays, activityLog, onGoingDay }) {
  const { t } = useTranslate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [streakDate, setStreakDate] = useState('');

  const handlePopoverOpen = (event, date) => {
    if (date) {
      setStreakDate(fDate(date));
    } else {
      setStreakDate(t('noData'));
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
          overflowX: 'auto', // Enable horizontal scrolling
          width: '100%',
          scrollSnapType: 'x mandatory', // Snap scrolling on the x-axis
          '::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar
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
          {[...Array(totalDays)].map((_, index) => (
            <Box
              aria-owns={open ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={(e) => handlePopoverOpen(e, activityLog[index]?.date)}
              onMouseLeave={handlePopoverClose}
              key={index}
              sx={{
                width: 16,
                height: 16,
                backgroundColor: (theme) =>
                  activityLog[index]?.active
                    ? theme.palette.success.main
                    : theme.palette.background.neutral,
                borderRadius: 0.3,
              }}
            />
          ))}
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
          <Typography sx={{ p: 1 }}>{streakDate}</Typography>
        </Popover>
      </Box>
    </Card>
  );
}

StreakTable.propTypes = {
  totalDays: PropTypes.number,
  activityLog: PropTypes.array,
  onGoingDay: PropTypes.number,
  // onGoingMonth: PropTypes.number,
};
