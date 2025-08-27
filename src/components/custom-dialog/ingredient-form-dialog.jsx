import * as Yup from 'yup';
import { mutate } from 'swr';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { useEffect, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
  Box,
} from '@mui/material';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import { api, endpoints } from 'src/utils/axios';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';

// ----------------------------------------------------------------------

const IngredientSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  serving: Yup.object().shape({
    id: Yup.string().nullable(),
    weightInGrams: Yup.number()
      .positive('Serving weight must be greater than 0')
      .required('Serving weight is required'),
    nutrientFacts: Yup.object().shape({
      cal: Yup.number()
        .min(0, 'Calories must be greater than or equal to 0')
        .required('Calories is required'),
      pro: Yup.number().min(0, 'Protein must be greater than or equal to 0').optional(),
      carb: Yup.number().min(0, 'Carbs must be greater than or equal to 0').optional(),
      fat: Yup.number().min(0, 'Fat must be greater than or equal to 0').optional(),
    }),
  }),
});

export default function IngredientFormDialog({
  open,
  onClose,
  ingredient = null,
  mealIndex,
  title = 'Add Ingredient',
  ...other
}) {
  const { t } = useTranslate();
  const { user, toggleIngredient } = useStore((state) => state);
  const defaultValues = useMemo(
    () => ({
      id: ingredient?.id || null,
      name: ingredient?.name || '',
      serving: {
        weightInGrams: ingredient?.servingWeightInGrams || 100,
        nutrientFacts: {
          cal: ingredient?.nutrientFacts?.cal || 0,
          pro: ingredient?.nutrientFacts?.pro || 0,
          carb: ingredient?.nutrientFacts?.carb || 0,
          fat: ingredient?.nutrientFacts?.fat || 0,
        },
      },
    }),
    [ingredient]
  );

  const methods = useForm({
    resolver: yupResolver(IngredientSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  console.log(errors);
  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [defaultValues, open, ingredient, reset]);

  const handleFormSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      if (ingredient?.id) {
        await api.patch(endpoints.user.ingredients(user.id), data);
      } else {
        const { data: ingredient } = await api.post(endpoints.user.ingredients(user.id), data);
        toggleIngredient(ingredient, mealIndex);
      }
      onClose();
    } catch (error) {
      console.error('Error submitting ingredient:', error);
    } finally {
      await mutate(endpoints.user.ingredients(user.id));
    }
  });

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 1 }}>{title}</DialogTitle>

      <FormProvider methods={methods} onSubmit={handleFormSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <RHFTextField
              name="name"
              label={t('ingredientName')}
              placeholder={t('enterIngredientName')}
              sx={{ mt: 1 }}
            />

            <RHFTextField
              name="serving.weightInGrams"
              label={t('servingWeight')}
              placeholder={t('enterServingWeight')}
              type="number"
              inputProps={{ min: 0.1, step: 0.1 }}
            />

            <Box>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>
                {t('nutrientFacts')} (per {methods.watch('serving.weightInGrams')}g)
              </Typography>

              <Stack spacing={1} direction={'row'}>
                <RHFTextField
                  name="serving.nutrientFacts.cal"
                  label={t('calories')}
                  placeholder="0"
                  type="number"
                  inputProps={{ min: 0, step: 0.1 }}
                />

                <RHFTextField
                  name="serving.nutrientFacts.pro"
                  label={t('pro')}
                  placeholder="0"
                  type="number"
                  inputProps={{ min: 0, step: 0.1 }}
                />

                <RHFTextField
                  name="serving.nutrientFacts.carb"
                  label={t('carbs')}
                  placeholder="0"
                  type="number"
                  inputProps={{ min: 0, step: 0.1 }}
                />

                <RHFTextField
                  name="serving.nutrientFacts.fat"
                  label={t('fat')}
                  placeholder="0"
                  type="number"
                  inputProps={{ min: 0, step: 0.1 }}
                />
              </Stack>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="inherit" onClick={onClose}>
            {t('cancel')}
          </Button>

          <LoadingButton type="submit" loading={isSubmitting} variant="contained">
            {ingredient ? t('update') : t('add')}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

IngredientFormDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  ingredient: PropTypes.object,
  mealIndex: PropTypes.number,
  title: PropTypes.string,
};
