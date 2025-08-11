import PropTypes from 'prop-types';
import { Container, Stack } from '@mui/material';
import { useCallback, useState, useEffect } from 'react';

import { fDateRange } from 'src/utils/format-time';

import DayCard from './day-card';
import WeekNavigator from './week-navigator';

export default function PlanDashboardWeek({
  data,
  setActiveDay,
  setActiveGroup,
  defaultWeekNumber,
}) {
  const [currentWeek, setCurrentWeek] = useState(defaultWeekNumber);
  const [currentWeekData, setCurrentWeekData] = useState(data[currentWeek - 1]);

  const weeksCount = data?.length;

  const handleBack = useCallback(() => {
    if (currentWeek > 1) {
      setCurrentWeek((prevWeek) => prevWeek - 1);
    }
  }, [setCurrentWeek, currentWeek]);

  const handleNext = useCallback(() => {
    if (currentWeek < weeksCount) {
      setCurrentWeek((prevWeek) => prevWeek + 1);
    }
  }, [setCurrentWeek, currentWeek, weeksCount]);

  const handleClickDay = useCallback(
    (day) => {
      setActiveDay(day);

      setActiveGroup('day');
    },
    [setActiveDay, setActiveGroup]
  );

  useEffect(() => {
    setCurrentWeekData(data[currentWeek - 1]);

    // eslint-disable-next-line
  }, [currentWeek, setCurrentWeekData]);

  return (
    <Container sx={{ pb: 10 }}>
      <WeekNavigator
        currentWeek={currentWeek}
        weeksCount={weeksCount}
        onBack={handleBack}
        onNext={handleNext}
        date={fDateRange({
          startDate: currentWeekData.startDate,
          endDate: currentWeekData.endDate,
        })}
      />

      <Stack sx={{ mt: 2 }} spacing={1}>
        {currentWeekData.days.map((day, index) => (
          <DayCard
            key={index}
            id={day.id}
            name={day.name}
            date={day.date}
            number={day.number}
            onClickDay={handleClickDay}
          />
        ))}
      </Stack>
    </Container>
  );
}

PlanDashboardWeek.propTypes = {
  data: PropTypes.object,
  setActiveDay: PropTypes.func,
  setActiveGroup: PropTypes.func,
  defaultWeekNumber: PropTypes.number,
};
