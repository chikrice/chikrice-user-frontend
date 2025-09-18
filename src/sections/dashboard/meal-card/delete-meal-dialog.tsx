import { useCallback } from 'react';
import { LoadingButton } from '@mui/lab';
import { enqueueSnackbar } from 'notistack';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import { api, endpoints } from 'src/utils/axios';
import { useBoolean } from 'src/hooks/use-boolean';

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
  const getPlan = useStore((state) => state.getPlan);
  const handleDeleteMeal = useCallback(async () => {
    try {
      loading.onTrue();
      await api.delete(endpoints.plans.meals.id(planId), { params: { mealId } });
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message || 'Failed to delete meal, please try again', {
        variant: 'error',
      });
    } finally {
      await getPlan(planId);
      loading.onFalse();
      onClose();
    }
  }, [planId, mealId, onClose, loading, getPlan]);

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
