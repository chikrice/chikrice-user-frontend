import { useMemo } from 'react';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SxProps,
} from '@mui/material';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { isPastDate } from 'src/utils/format-time';
import { useBoolean } from 'src/hooks/use-boolean';
import CustomIconButton from 'src/components/custom-icon-button';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// -------------------------------------

interface MoreActionsPopoverProps {
  sx?: SxProps;
  date: string | Date;
  planDayId: string;
  onCopyPlan: () => void;
  onSavePlan: () => void;
  onDeletePlan: () => void;
}

export default function MoreActionsPopover({
  sx,
  date,
  planDayId,
  onCopyPlan,
  onSavePlan,
  onDeletePlan,

  // onChangeAllMeals,
}: MoreActionsPopoverProps) {
  const { t } = useTranslate();
  // const router = useRouter();
  const loading = useBoolean(false);

  const popover = usePopover();
  const { user } = useStore();
  const isDeletePlan = useBoolean();

  // Memoize the result to avoid recalculating on every render unless the date changes
  const isDisabled = useMemo(() => isPastDate(date), [date]);
  const isPlanSaved = useMemo(() => user?.savedPlans?.includes(planDayId), [planDayId, user]);

  // Generic handler to wrap the actions and close the popover
  const handleAction = (action) => {
    return () => {
      if (action) action(); // Call the action if it exists
      popover.onClose(); // Close the popover after the action
    };
  };

  const handleDeleteMeals = () => {
    loading.onTrue();
    onDeletePlan();
    popover.onClose();
  };

  return (
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

      <CustomPopover open={popover.open} onClose={popover.onClose} hiddenArrow={true} arrow="bottom-right">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={onSavePlan}>
              <ListItemIcon>
                <Iconify icon={`lets-icons:bookmark-${isPlanSaved ? 'fill' : 'light'}`} />
              </ListItemIcon>
              <ListItemText primary={isPlanSaved ? t('removeFromSaved') : t('savePlan')} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={handleAction(onCopyPlan)}>
              <ListItemIcon>
                <Iconify icon={'tabler:copy'} />
              </ListItemIcon>
              <ListItemText primary={t('copyMealsTo')} />
            </ListItemButton>
          </ListItem>
          <Divider />

          <ListItem disablePadding>
            <ListItemButton
              sx={{ color: 'error.main' }}
              onClick={handleAction(isDeletePlan.onTrue)}
              disabled={isDisabled}
            >
              <ListItemIcon>
                <Iconify icon={'fluent:delete-12-filled'} />
              </ListItemIcon>
              <ListItemText primary={t('deleteMeals')} />
            </ListItemButton>
          </ListItem>
        </List>
      </CustomPopover>

      <Dialog open={isDeletePlan.value} onClose={isDeletePlan.onFalse}>
        <DialogTitle>{t('confirmMealsDelete')}</DialogTitle>
        <DialogContent>{t('confirmMealsDeleteContent')}</DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={isDeletePlan.onFalse}>
            {t('cancel')}
          </Button>
          <LoadingButton
            loading={loading.value}
            variant="contained"
            color="error"
            onClick={handleDeleteMeals}
          >
            {t('deleteMeals')}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  );
}
