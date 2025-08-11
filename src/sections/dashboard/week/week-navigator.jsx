import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, IconButton, Typography } from '@mui/material';

import { LeftIcon, RightIcon } from 'src/components/carousel/arrow-icons';

export default function WeekNavigator({ currentWeek, weeksCount, onBack, onNext, date }) {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, mt: 2 }}
    >
      <StyledIconButton disabled={currentWeek === 1} onClick={onBack}>
        <LeftIcon />
      </StyledIconButton>
      <Typography variant="subtitle2" color={'text.secondary'}>
        week {currentWeek}/{weeksCount} ({date})
      </Typography>
      <StyledIconButton disabled={currentWeek === weeksCount} onClick={onNext}>
        <RightIcon />
      </StyledIconButton>
    </Box>
  );
}

WeekNavigator.propTypes = {
  currentWeek: PropTypes.number,
  weeksCount: PropTypes.number,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  date: PropTypes.string,
};

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.card.default,
  '&.MuiIconButton-root:hover': {
    backgroundColor: theme.palette.card.soft,
    color: theme.palette.primary.main,
  },
}));
