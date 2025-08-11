import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useCallback, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Box, Container, FormLabel, Stack, Typography, Button } from '@mui/material';

import { useTranslate } from 'src/locales';
import { LoadingScreen } from 'src/components/loading-screen';
import { useIngredientsByCategories } from 'src/api/ingredient';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFRadioGroup, RHFSlider, RHFTextField } from 'src/components/hook-form';

import IngredientChip from '../../dashboard/day/free/meal-card/edit-mode/action-panel/ingredint-chip';

export default function UserPlanCustomizationView() {
  const { t } = useTranslate();

  const { ingredients, isLoading } = useIngredientsByCategories();

  const categoryMap = useMemo(() => {
    const map = {};
    ingredients?.forEach((group) => {
      map[group.category] = group.items;
    });
    return map;
  }, [ingredients]);

  const defaultUserData = useMemo(
    () => ({
      targetCalories: 3000,
      macrosRatio: { carb: 45, pro: 35, fat: 20 },
      mealsCount: 3,
      snacksCount: 1,
      ingredients: {
        carbs: categoryMap['carbs'] || [],
        proteins: categoryMap['proteins'] || [],
        fats: categoryMap['fats'] || [],
        fruits: categoryMap['fruits'] || [],
        vegetables: categoryMap['vegetables'] || [],
        dairy: categoryMap['dairy'] || [],
        snacks: categoryMap['snacks'] || [],
        sauces: categoryMap['sauces'] || [],
      },
    }),
    [categoryMap]
  );

  const userDataSchema = useMemo(
    () =>
      Yup.object().shape({
        targetCalories: Yup.number().min(1200).required(),
        mealsCount: Yup.number().required(),
        snacksCount: Yup.number().required(),
        ingredients: Yup.object().shape({
          carbs: Yup.array().min(2).required(),
          proteins: Yup.array().min(2).required(),
          fats: Yup.array().min(1).required(),
          fruits: Yup.array().min(1).required(),
          vegetables: Yup.array().min(1).required(),
          snacks: Yup.array().required(),
          dairy: Yup.array().required(),
          sauces: Yup.array().required(),
        }),
        macrosRatio: Yup.object().shape({
          carb: Yup.number().min(30).max(65).required(),
          pro: Yup.number().min(20).max(55).required(),
          fat: Yup.number().min(15).max(40).required(),
        }),
      }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(userDataSchema),
    defaultValues: defaultUserData,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    control,
  } = methods;

  useEffect(() => {
    reset(defaultUserData);
  }, [ingredients, defaultUserData, reset]);

  const values = watch();

  const handleSelectIngredient = useCallback(
    (ingredient) => {
      const { group } = ingredient;
      const currentIngredients = [...values.ingredients[group]];

      const foundIndex = currentIngredients.findIndex((ing) => ing.id === ingredient.id);
      if (foundIndex === -1) {
        currentIngredients.push(ingredient);
      } else {
        currentIngredients.splice(foundIndex, 1);
      }

      setValue(`ingredients.${group}`, currentIngredients);
    },
    [setValue, values.ingredients]
  );

  const handleSelectAll = (group) => {
    setValue(`ingredients.${group}`, categoryMap[group] || []);
  };

  const handleDeselectAll = (group) => {
    setValue(`ingredients.${group}`, []);
  };

  const onSubmit = handleSubmit(
    async (data) => console.log(data),
    (errors) => console.log(errors)
  );

  if (isLoading) return <LoadingScreen />;

  return (
    <Container sx={{ pb: 20 }}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Stack spacing={4} mt={3}>
          <Stack spacing={3}>
            <RHFRadioGroup
              row
              name="mealsCount"
              label={t('mealsCount')}
              options={[1, 2, 3, 4, 5].map((num) => ({ label: num, value: num }))}
            />

            <RHFRadioGroup
              row
              name="snacksCount"
              label={t('snacksCount')}
              options={[1, 2, 3].map((num) => ({ label: num, value: num }))}
            />
          </Stack>

          {ingredients?.map((group) => (
            <Controller
              key={group.category}
              name={`ingredients.${group.category}`}
              control={control}
              render={({ field }) => (
                <Box>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <FormLabel component="legend" sx={{ typography: 'body2' }}>
                      {t(group.category)}
                    </FormLabel>
                    <Stack direction="row" spacing={1}>
                      {!values.ingredients[group.category]?.length ? (
                        <Button
                          size="small"
                          variant="text"
                          onClick={() => handleSelectAll(group.category)}
                        >
                          {t('selectAll')}
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          variant="text"
                          onClick={() => handleDeselectAll(group.category)}
                        >
                          {t('deselectAll')}
                        </Button>
                      )}
                    </Stack>
                  </Stack>

                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {group.items.map((ingredient) => (
                      <IngredientChip
                        key={ingredient.id}
                        ingredient={{ ...ingredient, group: group.category }}
                        onSelect={handleSelectIngredient}
                        isSelected={field.value.some((item) => item.id === ingredient.id)}
                      />
                    ))}
                  </Box>

                  {errors.ingredients?.[group.category] && (
                    <Typography color="error" variant="body2">
                      {errors.ingredients[group.category]?.message}
                    </Typography>
                  )}
                </Box>
              )}
            />
          ))}

          <RHFTextField
            sx={{ mt: 2 }}
            name="targetCalories"
            label="Target Calories"
            placeholder="Target Calories"
          />

          <Stack spacing={1}>
            <FormLabel component="legend" sx={{ typography: 'body2' }}>
              Carb Ratio ({values.macrosRatio.carb}%)
              <RHFSlider name="macrosRatio.carb" />
            </FormLabel>
            <FormLabel component="legend" sx={{ typography: 'body2' }}>
              Protein Ratio ({values.macrosRatio.pro}%)
              <RHFSlider name="macrosRatio.pro" />
            </FormLabel>
            <FormLabel component="legend" sx={{ typography: 'body2' }}>
              Fat Ratio ({values.macrosRatio.fat}%)
              <RHFSlider name="macrosRatio.fat" />
            </FormLabel>
          </Stack>

          <LoadingButton type="submit" loading={isSubmitting} variant="contained">
            Save
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

// UserPlanCustomizationView.propTypes = {
//   ingredients: PropTypes.array,
// };
