import { mutate } from 'swr';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Box, Skeleton, Typography, Dialog, DialogContent } from '@mui/material';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import { api, endpoints } from 'src/utils/axios';
import { useResponsive } from 'src/hooks/use-responsive';
import { fDate, isDateisToday } from 'src/utils/format-time';
import CustomBottomDrawer from 'src/components/custom-drawer';
import CustomIconButton from 'src/components/custom-icon-button';

import NavigationContent from './navigation-content';
import CopySuccessMessage from './copy-success-message';
import MoreActionsPopover from './more-actions-popover';
import { StyledWrapper, StyledNavigator } from './styles';
import CopyMealsToCalendar from './copy-meals-to-calendar';

import type { PlanReference, PlanType } from 'chikrice-types';

// -------------------------------------

interface DayNavigatorProps {
  day: number;
  plan: PlanType;
  plans: PlanReference[];
  planLoading: boolean;
  totalDays: number;
  isDisableMealsActions: boolean;
  //
  updateDay: (day: number) => Promise<void>;
}
export default function DayNavigator({
  day,
  plan,
  plans,
  planLoading,
  totalDays,
  isDisableMealsActions = true,
  //
  updateDay,
}: DayNavigatorProps) {
  const { t } = useTranslate();
  const mdUp = useResponsive('up', 'md');
  const user = useStore((state) => state.user);
  const refreshUserInfo = useStore((state) => state.refreshUserInfo);

  const isToday = isDateisToday(plan?.date);

  const [isDrawer, setIsDrawer] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [targetDate, setTargetDate] = useState<{ number?: number }>({});
  const [drawerContent, setDrawerContent] = useState('');
  const [highlightedDate, setHighlightedDate] = useState(null);

  useEffect(() => {
    setHighlightedDate(plan?.date);
  }, [plan]);

  const handleCopyMeal = useCallback(async () => {
    console.log('copy melas');
  }, []);

  const handleCheckCopy = useCallback(async () => {
    setIsCopied(false);
    setIsDrawer(false);
    await updateDay(targetDate?.number);
    setTargetDate({});
  }, [targetDate, updateDay]);

  const handleNavigateTo = useCallback(
    async (dayNumber: number) => {
      setIsDrawer(false);
      await updateDay(dayNumber);
    },
    [updateDay]
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
      await api.delete(endpoints.plans.id(plan?.id));
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message || 'Failed to delete plan, please try again', {
        variant: 'error',
      });
    } finally {
      await mutate(endpoints.plans.id(plan.id));
    }
  }, [plan?.id]);

  const handleToggleSavePlan = useCallback(async () => {
    try {
      await refreshUserInfo(user.id);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message || 'Failed to save plan, please try again', {
        variant: 'error',
      });
    }
  }, [user, refreshUserInfo]);

  return (
    <StyledWrapper style={{ direction: 'ltr' }}>
      <StyledNavigator>
        <Box display={'flex'} gap={0.5}>
          {!isDisableMealsActions && (
            <MoreActionsPopover
              planDayId={plan.id}
              onCopyPlan={() => handleOpenDrawer('copy')}
              onSavePlan={handleToggleSavePlan}
              onDeletePlan={handleDeletePlan}
            />
          )}

          <CustomIconButton icon={'solar:calendar-outline'} onClick={() => handleOpenDrawer('navigate')} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CustomIconButton
            icon={'eva:arrow-ios-back-fill'}
            disabled={day === 1}
            onClick={() => updateDay(day - 1)}
          />

          {planLoading ? (
            <Skeleton variant="text" width={90} />
          ) : (
            <Typography
              variant="subtitle2"
              color={'text.secondary'}
              width={90}
              textAlign={'center'}
              style={{ direction: 'ltr' }}
            >
              {isToday ? t('today') : fDate(plan?.date, 'dd MMM')} {day}/{totalDays}
            </Typography>
          )}

          <CustomIconButton
            icon={'eva:arrow-ios-forward-fill'}
            disabled={day === totalDays}
            onClick={() => updateDay(day + 1)}
          />
        </Box>
      </StyledNavigator>

      {/* Mobile: Bottom Drawer */}
      {!mdUp && (
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
            <NavigationContent plans={plans} onNavigateTo={handleNavigateTo} />
          )}
        </CustomBottomDrawer>
      )}

      {/* Desktop: Dialog */}
      {mdUp && (
        <Dialog open={isDrawer} onClose={handleCloseDrawer} maxWidth="sm" fullWidth>
          <DialogContent sx={{ p: 0 }}>
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
              <NavigationContent plans={plans} onNavigateTo={handleNavigateTo} />
            )}
          </DialogContent>
        </Dialog>
      )}
    </StyledWrapper>
  );
}
