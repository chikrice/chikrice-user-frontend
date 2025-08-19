import { mutate } from 'swr';
import { useCallback } from 'react';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

import { useTranslate } from 'src/locales';
import { endpoints } from 'src/utils/axios';
import { useBoolean } from 'src/hooks/use-boolean';
import { deletePlanDayMeal } from 'src/api/plan-day';

// -------------------------------------

interface DeleteMealDialogProps {
  open: boolean;
  planId: string;
  mealId: string;
  onClose: () => void;
}

// -------------------------------------

export default function DeleteMealDialog({ open, planId, mealId, onClose }: DeleteMealDialogProps) {
  const { t } = useTranslate();
  const loading = useBoolean(false);

  const handleDeleteMeal = useCallback(async () => {
    try {
      loading.onTrue();
      await deletePlanDayMeal(planId, mealId);
    } catch (error) {
      console.log(error);
    } finally {
      await mutate(endpoints.plan_day.root(planId));
      loading.onFalse();
      onClose();
    }
  }, [planId, mealId, onClose, loading]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('mealDeleteConfirm')}?</DialogTitle>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          {t('cancel')}
        </Button>
        <LoadingButton loading={loading.value} variant="contained" color="error" onClick={handleDeleteMeal}>
          {t('delete')}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
