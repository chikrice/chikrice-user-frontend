import { mutate } from 'swr';
import PropTypes from 'prop-types';
import { parseISO } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { Box, Skeleton, Typography } from '@mui/material';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import { endpoints } from 'src/utils/axios';
import { fDate, isDateisToday } from 'src/utils/format-time';
import CustomIconButton from 'src/components/custom-icon-button';
import CustomBottomDrawer from 'src/components/custom-drawer/custom-drawer';
import { copyMeals, deletePlanDay, updateAllMeals, toogleSavePlanDay } from 'src/api/plan-day';

import NavigationContent from './navigation-content';
import CopySuccessMessage from './copy-success-message';
import MoreActionsPopover from './more-actions-popover';
import { StyledWrapper, StyledNavigator } from './styles';
import CopyMealsToCalendar from './copy-meals-to-calendar';

export default function DayNavigator({
  date,
  onBack,
  onNext,
  activeDay,
  totalDays,
  isLoading,
  planMonth,
  planDayIds,
  currentDay,
  onNavigateTo,
  isDisableMealsActions,
}) {
  const { t } = useTranslate();
  const { user, refreshUserInfo } = useStore();

  const isToday = isDateisToday(date);

  const [isDrawer, setIsDrawer] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [targetDate, setTargetDate] = useState({});
  const [drawerContent, setDrawerContent] = useState('');
  const [highlightedDate, setHighlightedDate] = useState(null);

  useEffect(() => {
    const activePlanDay = planDayIds[activeDay?.number - 1];
    setHighlightedDate(parseISO(activePlanDay?.date));
  }, [activeDay, planDayIds]);

  const handleCopyMeal = useCallback(
    async (newDate) => {
      try {
        const date = new Date(newDate);
        date.setUTCHours(0, 0, 0, 0);
        const planDay = planDayIds.find((plan) => plan.date === date.toISOString());
        setTargetDate(planDay);
        await copyMeals(planDay.id, { sourcePlanId: activeDay.id });
        setIsCopied(true);
      } catch (error) {
        console.error('Error copying meals:', error);
      }
    },
    [activeDay, planDayIds]
  );

  const handleChangeAllMeals = useCallback(async () => {
    try {
      await updateAllMeals(activeDay.id);
    } catch (error) {
      console.log(error);
    } finally {
      await mutate(endpoints.plan_day.root(activeDay.id));
    }
  }, [activeDay]);

  const handleCheckCopy = useCallback(() => {
    setIsCopied(false);
    setIsDrawer(false);
    onNavigateTo(targetDate.number);
    setTargetDate({});
  }, [targetDate, onNavigateTo]);

  const handleNavigateTo = useCallback(
    (dayNumber) => {
      setIsDrawer(false);
      onNavigateTo(dayNumber);
    },
    [onNavigateTo]
  );

  const handleOpenDrawer = useCallback((action) => {
    setIsDrawer(true);
    setDrawerContent(action);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawer(false);
    setTimeout(() => {
      setIsCopied(false);
    }, 500);
  }, []);

  const handleDeletePlan = useCallback(async () => {
    try {
      await deletePlanDay(activeDay.id);
    } catch (error) {
      console.log('error');
    } finally {
      await mutate(endpoints.plan_day.root(activeDay.id));
    }
  }, [activeDay]);

  const handleToggleSavePlan = useCallback(async () => {
    try {
      await toogleSavePlanDay(activeDay.id, { userId: user.id });
      await refreshUserInfo(user.id);
    } catch (error) {
      console.error(error);
    }
  }, [activeDay, user, refreshUserInfo]);

  return (
    <StyledWrapper style={{ direction: 'ltr' }}>
      <StyledNavigator>
        <Box display={'flex'} gap={0.5}>
          {!isDisableMealsActions && (
            <MoreActionsPopover
              open={true}
              date={date}
              planDayId={activeDay.id}
              onCopyPlan={() => handleOpenDrawer('copy')}
              onSavePlan={handleToggleSavePlan}
              onChangeAllMeals={handleChangeAllMeals}
              onDeletePlan={handleDeletePlan}
            />
          )}

          <CustomIconButton
            icon={'solar:calendar-outline'}
            onClick={() => handleOpenDrawer('navigate')}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CustomIconButton
            icon={'eva:arrow-ios-back-fill'}
            disabled={currentDay === 1}
            onClick={onBack}
          />

          {isLoading ? (
            <Skeleton variant="text" width={90} />
          ) : (
            <Typography
              variant="subtitle2"
              color={'text.secondary'}
              width={90}
              textAlign={'center'}
              style={{ direction: 'ltr' }}
            >
              {isToday ? t('today') : fDate(date, 'dd MMM')} {currentDay}/{totalDays}
            </Typography>
          )}
          <CustomIconButton
            icon={'eva:arrow-ios-forward-fill'}
            disabled={currentDay === totalDays}
            onClick={onNext}
          />
        </Box>
      </StyledNavigator>
      <CustomBottomDrawer
        open={isDrawer}
        onOpen={() => setIsDrawer(true)}
        onClose={handleCloseDrawer}
        height="auto"
      >
        {drawerContent === 'copy' ? (
          isCopied ? (
            <CopySuccessMessage onCheckCopy={handleCheckCopy} />
          ) : (
            <CopyMealsToCalendar
              highlightedDate={highlightedDate}
              onCopyMeal={handleCopyMeal}
              totalDays={totalDays}
            />
          )
        ) : (
          <NavigationContent
            currentDay={currentDay}
            planMonth={planMonth}
            onNavigateTo={handleNavigateTo}
          />
        )}
      </CustomBottomDrawer>
    </StyledWrapper>
  );
}

DayNavigator.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  date: PropTypes.string,
  isLoading: PropTypes.bool,
  planMonth: PropTypes.array,
  totalDays: PropTypes.number,
  activeDay: PropTypes.object,
  planDayIds: PropTypes.array,
  currentDay: PropTypes.number,
  onNavigateTo: PropTypes.func,
  isDisableMealsActions: PropTypes.bool,
};
