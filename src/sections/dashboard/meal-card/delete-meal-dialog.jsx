import { mutate } from 'swr';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

import { useTranslate } from 'src/locales';
import { endpoints } from 'src/utils/axios';
import { useBoolean } from 'src/hooks/use-boolean';
import { deletePlanDayMeal } from 'src/api/plan-day';

export default function DeleteMealDialog({ open, onClose, planDayId, mealId }) {
  const { t } = useTranslate();
  const loading = useBoolean(false);

  const handleDeleteMeal = useCallback(async () => {
    try {
      loading.onTrue();
      await deletePlanDayMeal(planDayId, mealId);
    } catch (error) {
      console.log(error);
    } finally {
      await mutate(endpoints.plan_day.root(planDayId));
      loading.onFalse();
      onClose();
    }
  }, [planDayId, mealId, onClose, loading]);

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

DeleteMealDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  planDayId: PropTypes.string,
  mealId: PropTypes.string,
};
