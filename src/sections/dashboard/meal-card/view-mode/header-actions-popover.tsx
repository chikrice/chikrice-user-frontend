import { useCallback } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useTheme } from '@mui/material/styles';
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import CustomIconButton from 'src/components/custom-icon-button';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import DeleteMealDialog from '../delete-meal-dialog';

import type { SxProps, Theme } from '@mui/material';

// -------------------------------------

interface HeaderActionsPopoverProps {
  sx?: SxProps<Theme>;
  mode: 'view' | 'edit';
  mealId: string;
  mealIndex: number;
  planId: string;
}

// -------------------------------------

export default function HeaderActionsPopover({
  sx,
  mode,
  mealId,
  mealIndex,
  planId,
}: HeaderActionsPopoverProps) {
  const popover = usePopover();

  const isDeleteMeal = useBoolean();

  const { t } = useTranslate();
  const updatePlan = useStore((state) => state.updatePlan);
  const toggleMealMode = useStore((state) => state.toggleMealMode);
  const theme = useTheme();

  const isRTL = theme.direction === 'rtl';

  const handleOpenEditMode = useCallback(async () => {
    toggleMealMode(mealIndex, 'edit');
    popover.onClose();
  }, [mealIndex, popover, toggleMealMode]);

  const handleCloseEditMode = useCallback(async () => {
    try {
      toggleMealMode(mealIndex, 'view');
      await updatePlan(planId);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message || 'Failed to save meal changes, please try again', {
        variant: 'error',
      });
    }
  }, [planId, mealIndex, toggleMealMode, updatePlan]);

  return (
    <>
      {mode === 'view' ? (
        <>
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

          <CustomPopover
            open={popover.open}
            onClose={popover.onClose}
            hiddenArrow={true}
            arrow={isRTL ? 'top-left' : 'top-right'}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={handleOpenEditMode}>
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
