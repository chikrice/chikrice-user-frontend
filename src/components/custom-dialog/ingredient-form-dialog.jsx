import * as Yup from 'yup';
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

import { useLocales, useTranslate } from 'src/locales';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';

// ----------------------------------------------------------------------

const IngredientSchema = Yup.object().shape({
  name: Yup.object().shape({
    en: Yup.string().when('$lang', {
      is: 'en',
      then: (schema) => schema.required('Name is required'),
      otherwise: (schema) => schema.optional(),
    }),
    ar: Yup.string().when('$lang', {
      is: 'ar',
      then: (schema) => schema.required('Name is required'),
      otherwise: (schema) => schema.optional(),
    }),
    fa: Yup.string().when('$lang', {
      is: 'fa',
      then: (schema) => schema.required('Name is required'),
      otherwise: (schema) => schema.optional(),
    }),
  }),
  serving: Yup.object().shape({
    id: Yup.string().nullable(),
    weightInGrams: Yup.number()
      .positive('Serving weight must be greater than 0')
      .required('Serving weight is required'),
    nutrientFacts: Yup.object().shape({
      cal: Yup.number().positive('Calories must be greater than 0').required('Calories is required'),
      pro: Yup.number().min(0, 'Protein must be greater than or equal to 0').optional(),
      carb: Yup.number().min(0, 'Carbs must be greater than or equal to 0').optional(),
      fat: Yup.number().min(0, 'Fat must be greater than or equal to 0').optional(),
    }),
  }),
});

export default function IngredientFormDialog({
  open,
  onClose,
  onSubmit,
  ingredient = null,
  title = 'Add Ingredient',
  ...other
}) {
  const { t } = useTranslate();
  const { lang } = useLocales();

  const defaultValues = useMemo(
    () => ({
      id: ingredient?.id || null,
      name: ingredient?.name || { en: '', ar: '', fa: '' },
      serving: {
        weightInGrams: ingredient?.serving?.weightInGrams || 100,
        nutrientFacts: {
          cal: ingredient?.serving.nutrientFacts?.cal,
          pro: ingredient?.serving.nutrientFacts?.pro,
          carb: ingredient?.serving.nutrientFacts?.carb,
          fat: ingredient?.serving.nutrientFacts?.fat,
        },
      },
    }),
    [ingredient, lang]
  );

  const methods = useForm({
    resolver: yupResolver(IngredientSchema),
    defaultValues,
    context: { lang },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [defaultValues, open, ingredient, reset]);

  const handleFormSubmit = handleSubmit(async (data) => {
    try {
      await onSubmit(data);
    } catch (error) {
      console.error('Error submitting ingredient:', error);
    }
  });

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      <DialogTitle sx={{ pb: 1 }}>{title}</DialogTitle>

      <FormProvider methods={methods} onSubmit={handleFormSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <RHFTextField
              name={`name.${lang}`}
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
  onSubmit: PropTypes.func,
  ingredient: PropTypes.object,
  title: PropTypes.string,
};
