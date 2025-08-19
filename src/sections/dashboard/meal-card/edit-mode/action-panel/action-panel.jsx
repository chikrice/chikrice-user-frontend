import { mutate } from 'swr';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { LoadingButton } from '@mui/lab';
import { useCallback, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import { endpoints } from 'src/utils/axios';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useBoolean } from 'src/hooks/use-boolean';
import { useDebounce } from 'src/hooks/use-debounce';
import { useSearchIngredients } from 'src/api/ingredient';
import { togglePlanDayMealIngredient, toggleMealMode, deletePlanDayMeal } from 'src/api/plan-day';

import MealInputAi from './meal-input-ai';
import NutrientGroup from './nutrient-group';
import SearchIngredient from './search-ingredient';
import DeleteMealDialog from '../../delete-meal-dialog';
import SearchResultsIngredients from './search-results-ingredients';

export default function ActionPanel({ planId, mealId, canSave, selectedIngredients }) {
  const loading = useBoolean();

  const { t } = useTranslate();
  const { user } = useStore((store) => store);
  const userId = user.id;

  const isDeleteMeal = useBoolean();
  const isTellAi = useBoolean();

  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery);

  const handleToggleIngredient = useCallback(
    async (ingredient) => {
      try {
        await togglePlanDayMealIngredient(planId, {
          mealId,
          userId,
          ingredient,
        });
        await mutate(endpoints.plan_day.root(planId));
        setSearchQuery('');
      } catch (error) {
        console.log(error);
      }
    },
    [mealId, planId, userId]
  );

  const handleSaveMeal = useCallback(async () => {
    try {
      loading.onTrue();

      if (canSave) {
        await toggleMealMode(planId, {
          mealId,
          userId,
          mode: 'view',
        });
      } else {
        await deletePlanDayMeal(planId, mealId);
      }
    } catch (error) {
      console.log(error);
    } finally {
      await mutate(endpoints.plan_day.root(planId));
      loading.onFalse();
    }
  }, [planId, mealId, canSave, userId, loading]);

  const { searchResults, resultType, searchLoading } = useSearchIngredients(userId, debouncedQuery);

  return (
    <>
      <StyledWrapper>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 1.5,
            pb: 1,
            pt: 2,
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
            <Button startIcon={<Iconify icon={'ph:plus-circle-bold'} />} onClick={isTellAi.onFalse}>
              {t('enterManually')}
            </Button>
          ) : (
            <Button startIcon={<Iconify icon={'mingcute:ai-fill'} />} onClick={isTellAi.onTrue}>
              {t('tellAi')}
            </Button>
          )}

          <LoadingButton
            variant={canSave ? 'contained' : 'text'}
            sx={{ height: '30px', minWidth: '30px', p: 0, borderRadius: '50%' }}
            loading={loading.value}
            onClick={handleSaveMeal}
          >
            <Iconify icon={`${!canSave ? 'mingcute:close-fill' : 'majesticons:arrow-up-line'}`} />
          </LoadingButton>
        </Box>

        <Scrollbar sx={{ height: 320, pt: 2 }}>
          <Stack pb={24}>
            {isTellAi.value ? (
              <MealInputAi planId={planId} mealId={mealId} />
            ) : (
              <>
                {resultType === 'query' ? (
                  <SearchResultsIngredients
                    results={searchResults}
                    isLoading={searchLoading}
                    onSelect={handleToggleIngredient}
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
      </StyledWrapper>

      <DeleteMealDialog
        open={isDeleteMeal.value}
        onClose={isDeleteMeal.onFalse}
        planId={planId}
        mealId={mealId}
      />
    </>
  );
}

ActionPanel.propTypes = {
  mealId: PropTypes.string,
  canSave: PropTypes.bool,
  planId: PropTypes.string,
  ingredients: PropTypes.array,
  selectedIngredients: PropTypes.array,
};

const StyledWrapper = styled(Box)(({ theme }) => ({
  left: 0,
  bottom: 0,
  width: '100%',
  minHeight: 300,
  height: '30svh',
  position: 'fixed',
  zIndex: 1000,
  boxShadow: theme.customShadows.bottomNav,
  backgroundColor: theme.palette.background.default,
  borderTopLeftRadius: 30,
  borderTopRightRadius: 30,
}));
