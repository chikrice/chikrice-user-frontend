import { mutate } from 'swr';
import { useTheme } from '@emotion/react';
import { useCallback, useEffect } from 'react';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { api, endpoints } from 'src/utils/axios';
import { useBoolean } from 'src/hooks/use-boolean';
import { deletePlanDayMeal } from 'src/api/plan-day';
import CustomIconButton from 'src/components/custom-icon-button';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import DeleteMealDialog from '../delete-meal-dialog';

import type { SxProps, Theme } from '@mui/material';

// -------------------------------------

interface HeaderActionsPopoverProps {
  sx?: SxProps<Theme>;
  mode: 'view' | 'edit';
  mealId: string;
  planId: string;
  isPast: boolean;
  canSave: boolean;
}

// -------------------------------------

export default function HeaderActionsPopover({
  sx,
  mode,
  mealId,
  isPast,
  planId,
  canSave,
}: HeaderActionsPopoverProps) {
  const popover = usePopover();

  const isDeleteMeal = useBoolean();

  const { t } = useTranslate();
  const user = useStore((state) => state.user);
  const theme = useTheme();

  const isRTL = theme.direction === 'rtl';
  const userId = user.id;

  const handleToggleMode = useCallback(
    async (mode: 'view' | 'edit') => {
      try {
        await api.patch(endpoints.plans.meals.toggleMode(planId), {
          mealId,
          userId,
          mode,
        });
        popover.onClose();
      } catch (error) {
        console.log(error);
      } finally {
        await mutate(endpoints.plans.id(planId));
      }
    },
    [planId, mealId, userId, popover]
  );

  const handleCloseEditMode = useCallback(async () => {
    try {
      if (canSave) {
        await handleToggleMode('view');
      } else {
        await api.delete(endpoints.plans.meals.id(planId), { params: { mealId } });
      }
    } catch (error) {
      console.error(error);
    } finally {
      await mutate(endpoints.plan_day.root(planId));
    }
  }, [canSave, mealId, planId, handleToggleMode]);

  useEffect(() => {
    return () => {
      if (mode === 'edit') {
        handleToggleMode('view');
      }
    };
    // eslint-disable-next-line
  }, [location]);

  return (
    <>
      {mode === 'view' ? (
        <>
          {!isPast && (
            <CustomIconButton
              onClick={popover.onOpen}
              sx={{
                ...(popover.open && {
                  bgcolor: 'action.selected',
                }),
                ...sx,
              }}
              icon={'mingcute:more-2-fill'}
            />
          )}

          <CustomPopover
            open={popover.open}
            onClose={popover.onClose}
            hiddenArrow={true}
            arrow={isRTL ? 'top-left' : 'top-right'}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => handleToggleMode('edit')}>
                  <ListItemIcon>
                    <Iconify icon={'ic:edit'} />
                  </ListItemIcon>
                  <ListItemText primary={t('editMeal')} />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton
                  sx={{ color: 'error.main' }}
                  onClick={() => {
                    isDeleteMeal.onTrue();
                    popover.onClose();
                  }}
                >
                  <ListItemIcon>
                    <Iconify icon={'fluent:delete-12-filled'} />
                  </ListItemIcon>
                  <ListItemText primary={t('deleteMeal')} />
                </ListItemButton>
              </ListItem>
            </List>
          </CustomPopover>
        </>
      ) : (
        <CustomIconButton icon={'mingcute:close-fill'} onClick={handleCloseEditMode} />
      )}
      <DeleteMealDialog
        open={isDeleteMeal.value}
        onClose={isDeleteMeal.onFalse}
        planId={planId}
        mealId={mealId}
      />
    </>
  );
}
