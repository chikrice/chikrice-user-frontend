import { enqueueSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { api, endpoints } from 'src/utils/axios';
import { useBoolean } from 'src/hooks/use-boolean';
import { useDebounce } from 'src/hooks/use-debounce';
import { useSearchIngredients } from 'src/api/ingredient';
import { IngredientFormDialog } from 'src/components/custom-dialog';

import MealInputAi from '../meal-card/edit-mode/action-panel/meal-input-ai';
import NutrientGroup from '../meal-card/edit-mode/action-panel/nutrient-group';
import SearchIngredient from '../meal-card/edit-mode/action-panel/search-ingredient';
import SearchResultsIngredients from '../meal-card/edit-mode/action-panel/search-results-ingredients';

import type { MealIngredient, IngredientType } from 'chikrice-types';

// -------------------------------------
interface DesktopActionPanelProps {
  planId: string;
  mealIndex: number;
  selectedIngredients: MealIngredient[];
}

// -------------------------------------

export default function DesktopActionPanel({
  planId,
  mealIndex,
  selectedIngredients,
}: DesktopActionPanelProps) {
  const { t } = useTranslate();

  const user = useStore((state) => state.user);
  const updatePlan = useStore((state) => state.updatePlan);
  const toggleMealMode = useStore((state) => state.toggleMealMode);
  const toggleIngredient = useStore((state) => state.toggleIngredient);

  const isTellAi = useBoolean();
  const isIngredientDialog = useBoolean();
  const [searchQuery, setSearchQuery] = useState('');

  // Check if meal can be saved (has ingredients)
  const canSave = selectedIngredients.length > 0;

  const debouncedQuery = useDebounce(searchQuery);
  const { searchResults, resultType, searchLoading, mutate } = useSearchIngredients(user?.id, debouncedQuery);

  const handleToggleIngredient = useCallback(
    (ingredient: IngredientType) => {
      toggleIngredient(ingredient, mealIndex);
      setSearchQuery('');
    },
    [mealIndex, toggleIngredient]
  );

  const handleSaveMeal = useCallback(async () => {
    try {
      toggleMealMode(mealIndex, 'view');
      await updatePlan(planId);
    } catch (error) {
      console.error(error);
      toggleMealMode(mealIndex, 'edit');
      enqueueSnackbar(error.message || 'Failed to save meal, please try again', { variant: 'error' });
    }
  }, [planId, mealIndex, toggleMealMode, updatePlan]);

  const handleAddingNewIngredient = useCallback(
    async (data) => {
      try {
        const { data: ingredient } = await api.post(endpoints.user.ingredients(user.id), data);
        toggleIngredient(ingredient, mealIndex);
        isIngredientDialog.onFalse();
        await mutate();
      } catch (error) {
        enqueueSnackbar(error.message || 'Failed to add ingredient, please try again', { variant: 'error' });
      }
    },
    [mealIndex, isIngredientDialog, user?.id, toggleIngredient, mutate]
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '400px',
          maxHeight: '400px',
          boxShadow: (theme) => theme.customShadows.card,
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 1.5,
            py: 1,
            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
            flexShrink: 0,
          }}
        >
          {!isTellAi.value && (
            <SearchIngredient
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoading={searchLoading}
            />
          )}

          <Box
            sx={{ display: 'flex', gap: 2, alignItems: 'center', width: isTellAi.value ? '100%' : 'auto' }}
          >
            {isTellAi.value ? (
              <Button
                size="small"
                startIcon={<Iconify icon={'ph:plus-circle-bold'} />}
                onClick={isTellAi.onFalse}
              >
                {t('enterManually')}
              </Button>
            ) : (
              <>
                <Button
                  size="small"
                  startIcon={<Iconify icon={'mingcute:ai-fill'} />}
                  onClick={isTellAi.onTrue}
                >
                  {t('tellAi')}
                </Button>
                <Button
                  size="small"
                  startIcon={<Iconify icon={'stash:plus-solid'} />}
                  onClick={isIngredientDialog.onTrue}
                >
                  {t('new')}
                </Button>
              </>
            )}

            {/* Save Button */}
            <Button
              variant={canSave ? 'contained' : 'text'}
              sx={{
                height: '30px',
                minWidth: '30px',
                p: 0,
                borderRadius: '50%',
                marginInlineStart: isTellAi.value ? 'auto' : 0,
              }}
              onClick={handleSaveMeal}
            >
              <Iconify icon={`${!canSave ? 'mingcute:close-fill' : 'majesticons:arrow-up-line'}`} />
            </Button>
          </Box>
        </Box>

        {/* Content */}
        <Scrollbar sx={{ flex: 1, pt: 2, minHeight: 0 }}>
          <Stack pb={2}>
            {isTellAi.value ? (
              <MealInputAi mealIndex={mealIndex} />
            ) : (
              <>
                {resultType === 'query' ? (
                  <SearchResultsIngredients
                    results={searchResults}
                    isLoading={searchLoading}
                    onSelect={handleToggleIngredient}
                    onAddNewIngredient={isIngredientDialog.onTrue}
                    selectedIngredients={selectedIngredients}
                  />
                ) : (
                  searchResults?.map((group, index) => (
                    <NutrientGroup
                      key={index}
                      title={t(group.title)}
                      onSelect={handleToggleIngredient}
                      isLoading={searchLoading}
                      ingredients={group.ingredients}
                      selectedIngredients={selectedIngredients}
                    />
                  ))
                )}
              </>
            )}
          </Stack>
        </Scrollbar>
      </Box>

      <IngredientFormDialog
        open={isIngredientDialog.value}
        onClose={isIngredientDialog.onFalse}
        onSubmit={handleAddingNewIngredient}
        mealIndex={mealIndex}
        title={t('addNewIngredient')}
      />
    </>
  );
}
