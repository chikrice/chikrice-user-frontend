import { mutate } from 'swr';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import { useCallback, useEffect } from 'react';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import { endpoints } from 'src/utils/axios';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import CustomIconButton from 'src/components/custom-icon-button';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { deletePlanDayMeal, mutatePlanDay, toggleMealMode } from 'src/api/plan-day';

import DeleteMealDialog from '../delete-meal-dialog';

// ----------------------------------------------------------------------

export default function HeaderActionsPopover({ sx, mode, mealId, isPast, planDayId, canSave, mealNotes }) {
  const popover = usePopover();

  const isDeleteMeal = useBoolean();

  const { t } = useTranslate();
  const user = useStore();
  const theme = useTheme();
  const isRTL = theme.direction === 'rtl';
  const userId = user.id;

  const handleToggleMode = useCallback(
    async (mode) => {
      try {
        await toggleMealMode(planDayId, {
          mealId,
          userId,
          mode,

          notes: mealNotes,
        });
        popover.onClose();
      } catch (error) {
        console.log(error);
      } finally {
        await mutate(endpoints.plan_day.root(planDayId), mutatePlanDay(planDayId));
      }
    },
    [planDayId, mealId, mealNotes, userId, popover]
  );

  const handleCloseEditMode = useCallback(async () => {
    try {
      if (canSave) {
        await handleToggleMode('view');
      } else {
        await deletePlanDayMeal(planDayId, mealId);
      }
    } catch (error) {
      console.error(error);
    } finally {
      await mutate(endpoints.plan_day.root(planDayId));
    }
  }, [canSave, mealId, planDayId, handleToggleMode]);

  useEffect(() => {
    return async () => {
      if (mode === 'edit') {
        await handleToggleMode('view');
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
        planDayId={planDayId}
        mealId={mealId}
      />
    </>
  );
}

HeaderActionsPopover.propTypes = {
  sx: PropTypes.object,
  mode: PropTypes.string,
  mealId: PropTypes.string,
  isPast: PropTypes.bool,
  planDayId: PropTypes.string,
  canSave: PropTypes.bool,
  mealNotes: PropTypes.oneOfType([PropTypes.string, undefined]),
};
