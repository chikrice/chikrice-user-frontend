import { enqueueSnackbar } from 'notistack';
import { Box, Button, Stack } from '@mui/material';
import { useCallback, useState, useEffect } from 'react';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { api, endpoints } from 'src/utils/axios';
import { useBoolean } from 'src/hooks/use-boolean';
import { useDebounce } from 'src/hooks/use-debounce';
import { useSearchIngredients } from 'src/api/ingredient';
import { IngredientFormDialog } from 'src/components/custom-dialog';

import MealInputAi from './meal-input-ai';
import NutrientGroup from './nutrient-group';
import SearchIngredient from './search-ingredient';
import ActionPanelDrawer from './action-panel-drawer';
import DeleteMealDialog from '../../delete-meal-dialog';
import SearchResultsIngredients from './search-results-ingredients';

import type { MealIngredient, IngredientType } from 'chikrice-types';

// -------------------------------------
interface ActionPanelProps {
  isOpen: boolean;
  planId: string;
  mealId: string;
  mealIndex: number;
  canSave: boolean;
  selectedIngredients: MealIngredient[];
}

// -------------------------------------

export default function ActionPanel({
  isOpen,
  planId,
  mealId,
  mealIndex,
  canSave,
  selectedIngredients,
}: ActionPanelProps) {
  const { t } = useTranslate();

  const user = useStore((state) => state.user);
  const updatePlan = useStore((state) => state.updatePlan);
  const toggleMealMode = useStore((state) => state.toggleMealMode);
  const toggleIngredient = useStore((state) => state.toggleIngredient);

  const isTellAi = useBoolean();
  const isDeleteMeal = useBoolean();
  const isIngredientDialog = useBoolean();
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery);
  const { searchResults, resultType, searchLoading, mutate } = useSearchIngredients(user?.id, debouncedQuery);

  const handleToggleIngredient = useCallback(
    (ingredient: IngredientType) => {
      toggleIngredient(ingredient, mealIndex);
      setSearchQuery('');
    },
    [mealIndex, toggleIngredient, setSearchQuery]
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

  const [drawerOpen, setDrawerOpen] = useState(isOpen);

  useEffect(() => {
    if (isOpen) setDrawerOpen(true);
  }, [isOpen]);

  return (
    <>
      <ActionPanelDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onExited={handleSaveMeal}
        height="35svh"
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 1.5,
            pb: 1,
            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          {!isTellAi.value && (
            <SearchIngredient
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isLoading={searchLoading}
            />
          )}
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

          <Button
            variant={canSave ? 'contained' : 'text'}
            sx={{ height: '30px', minWidth: '30px', p: 0, borderRadius: '50%' }}
            onClick={() => setDrawerOpen(false)}
          >
            <Iconify icon={`${!canSave ? 'mingcute:close-fill' : 'majesticons:arrow-up-line'}`} />
          </Button>
        </Box>

        <Scrollbar sx={{ height: 320, pt: 2, flex: 1 }}>
          <Stack pb={24}>
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
      </ActionPanelDrawer>

      <DeleteMealDialog
        open={isDeleteMeal.value}
        onClose={isDeleteMeal.onFalse}
        planId={planId}
        mealId={mealId}
      />

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
