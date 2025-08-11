import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';
import { useCallback, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { Box, Dialog, DialogActions, Divider, FormLabel, Stack, Typography } from '@mui/material';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import { useGetPlanDay } from 'src/api/plan-day';
import Scrollbar from 'src/components/scrollbar';
import { RHFRadioGroup } from 'src/components/hook-form';
import { LoadingScreen } from 'src/components/loading-screen';
import { useIngredientsByCategories } from 'src/api/ingredient';
import FormProvider from 'src/components/hook-form/form-provider';

import IngredientChip from '../../free/meal-card/edit-mode/action-panel/ingredint-chip';

export default function ChikrcieGeneratorConfig({ open, onClose, planDayId }) {
  const { t } = useTranslate();

  const { user } = useStore();
  const { plan } = useGetPlanDay(planDayId);
  const { ingredients, isLoading } = useIngredientsByCategories();

  const defaultUserData = useMemo(
    () => ({
      mealsCount: plan?.mealsCount || 3,
      snacksCount: plan?.snacksCount || 2,
      userWeight: user?.currentWeight,
      userGoal: user?.targetWeight > user?.currentWeight ? 'gainWeight' : 'loseWeight',
      // notes: '',
      ingredients: {
        carbs: [],
        proteins: [],
        fats: [],
        fruits: [],
        dairy: [],
        snacks: [],
      },
    }),
    [plan, user]
  );

  const userDataSchema = useMemo(
    () =>
      Yup.object().shape({
        mealsCount: Yup.number().required(),
        snacksCount: Yup.number().required(),
        // notes: Yup.string(),
        userWeight: Yup.number().required(),
        userGoal: Yup.string().oneOf(['loseWeight', 'gainWeight']),
        ingredients: Yup.object().shape({
          carbs: Yup.array().min(2, t('minCarbs')).required(),
          proteins: Yup.array().min(2, t('minProteins')).required(),
          fats: Yup.array().min(1, t('minFats')).required(),
          fruits: Yup.array().min(1, t('minFruits')).required(),
          snacks: Yup.array().required(),
          dairy: Yup.array().required(),
        }),
      }),
    [t]
  );

  const methods = useForm({
    resolver: yupResolver(userDataSchema),
    defaultValues: defaultUserData,
  });

  const {
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
    setValue,
    control,
  } = methods;

  // useEffect(() => {
  //   reset(defaultUserData);
  // }, [ingredients, defaultUserData, reset]);

  const values = watch();

  const handleSelectIngredient = useCallback(
    (ingredient) => {
      const { group, ...cleanIngredient } = ingredient;
      const currentIngredients = [...values.ingredients[group]];

      const foundIndex = currentIngredients.findIndex((ing) => ing.id === ingredient.id);
      if (foundIndex === -1) {
        currentIngredients.push(cleanIngredient);
      } else {
        currentIngredients.splice(foundIndex, 1);
      }

      setValue(`ingredients.${group}`, currentIngredients);
    },
    [setValue, values.ingredients]
  );

  const onSubmit = handleSubmit(
    async (data) => console.log(data),
    (errors) => console.log(errors),
    [planDayId]
  );

  if (isLoading) return <LoadingScreen />;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          width: '100%',
          m: '16px',
        },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Scrollbar p={2} pb={4} sx={{ height: '80svh' }}>
          <Box>
            <Typography variant="h2">{t('customizationTitle')}</Typography>
            <Typography variant="body2">{t('thisIsOurSuggestions')}</Typography>
          </Box>

          <Box mt={2}>
            {/* <Typography variant="subtitle2">{t('selectWhatAvailable')}</Typography> */}
            <Stack spacing={2}>
              {ingredients?.map((group) => (
                <Controller
                  key={group.category}
                  name={`ingredients.${group.category}`}
                  control={control}
                  render={({ field }) => (
                    <Box>
                      <FormLabel component="legend" sx={{ typography: 'body2', mb: 0.5 }}>
                        {t(group.category)}
                      </FormLabel>

                      <Box display="flex" flexWrap="wrap" gap={1}>
                        {group.items.map((ingredient) => (
                          <IngredientChip
                            key={ingredient.id}
                            ingredient={{ ...ingredient, group: group.category }}
                            onSelect={handleSelectIngredient}
                            isSelected={field?.value?.some((item) => item.id === ingredient.id)}
                          />
                        ))}
                      </Box>
                      {errors.ingredients?.[group.category] && (
                        <Typography color="error" variant="body2" mt={1}>
                          {errors.ingredients[group.category]?.message}
                        </Typography>
                      )}
                    </Box>
                  )}
                />
              ))}
            </Stack>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={1}>
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
          {/* <Stack spacing={1}>
            <Typography variant="subtitle2">{t('customizeFurther')}</Typography>
            <RHFTextarea name={'notes'} />
          </Stack> */}
        </Scrollbar>
        <DialogActions>
          <LoadingButton fullWidth type="submit" loading={isSubmitting} variant="contained">
            {t('generatePlan')}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

ChikrcieGeneratorConfig.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  planDayId: PropTypes.string,
};
