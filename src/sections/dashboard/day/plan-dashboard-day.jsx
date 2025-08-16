import PropTypes from 'prop-types';
import { Box, Skeleton, Stack } from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';

import useStore from 'src/store';
import { isPastDate } from 'src/utils/format-time';
import { updateActivityLog } from 'src/api/roadmap';
import CircleButton from 'src/components/circle-button';
import { useGetPlanDay, useInitCustomMeal } from 'src/api/plan-day';

import PlanFree from './free/plan-free';
import MacrosBar from './common/macros-bar';
import DayNavigator from './common/day-navigator';

export default function PlanDashboardDay({ planDay, planMonth, activeDay, totalDays, setActiveDay }) {
  const { roadmap, updateRoadmap } = useStore();

  const initCustomMeal = useInitCustomMeal(activeDay?.id);

  const { plan, planLoading } = useGetPlanDay(activeDay?.id);

  const [currentDay, setCurrentDay] = useState(activeDay?.number);

  const isPast = useMemo(() => isPastDate(plan.date), [plan]);

  const handleBack = useCallback(() => {
    if (currentDay > 1) {
      setCurrentDay((prevDay) => prevDay - 1);
    }
  }, [setCurrentDay, currentDay]);

  const handleNavigateTo = useCallback(
    (day) => {
      if (day && day <= totalDays) {
        setCurrentDay(day);
      }
    },
    [setCurrentDay, totalDays]
  );

  const handleNext = useCallback(() => {
    if (currentDay < totalDays) {
      setCurrentDay((prevDay) => prevDay + 1);
    }
  }, [setCurrentDay, currentDay, totalDays]);

  useEffect(() => {
    setActiveDay({ number: currentDay, id: planDay[currentDay - 1]?.id });
  }, [currentDay, setActiveDay, planDay]);

  useEffect(() => {
    const updateLog = async () => {
      const calorieDifference = Math.abs(plan?.consumedMacros?.cal - plan?.targetMacros?.cal);
      const index = currentDay - 1;
      const todayLog = roadmap?.activityLog[index];

      if (todayLog === undefined) return;

      const isActive = todayLog.active;

      if (calorieDifference <= 100 && !isActive) {
        updateActivityLog(roadmap.id, { active: true, index });
        updateRoadmap(roadmap.id);
      }

      if (calorieDifference >= 100 && isActive) {
        updateActivityLog(roadmap.id, { active: false, index });
        updateRoadmap(roadmap.id);
      }
    };
    updateLog();
    // eslint-disable-next-line
  }, [plan?.consumedMacros]);

  return (
    <>
      <Stack>
        <MacrosBar
          isPro={true}
          className="dash__tour__2"
          isLoading={planLoading}
          targetMacros={plan?.targetMacros}
          consumedMacros={plan?.consumedMacros}
        />

        <Box>
          {planLoading ? (
            <Box sx={{ px: 2 }}>
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} width={'100%'} height={329} sx={{ mb: 2 }} />
              ))}
            </Box>
          ) : (
            <PlanFree
              isPast={isPast}
              meals={plan?.meals}
              date={activeDay?.date}
              planDayId={activeDay?.id}
              currentDay={currentDay}
              planDay={planDay}
            />
          )}
        </Box>

        <CircleButton
          icon="ph:plus-bold"
          width={55}
          style={{ right: 16 }}
          sx={{ position: 'absolute', bottom: 122 }}
          onClick={initCustomMeal}
        />

        <DayNavigator
          date={plan?.date}
          onBack={handleBack}
          onNext={handleNext}
          planDayIds={planDay}
          totalDays={totalDays}
          planMonth={planMonth}
          activeDay={activeDay}
          currentDay={currentDay}
          isLoading={planLoading}
          onNavigateTo={handleNavigateTo}
          isDisableMealsActions={!plan?.meals.length}
        />
      </Stack>
    </>
  );
}

PlanDashboardDay.propTypes = {
  planDay: PropTypes.array,
  planMonth: PropTypes.array,
  totalDays: PropTypes.number,
  activeDay: PropTypes.object,
  setActiveDay: PropTypes.func,
};
