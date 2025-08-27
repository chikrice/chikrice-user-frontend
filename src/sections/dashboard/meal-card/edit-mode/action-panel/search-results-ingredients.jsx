import PropTypes from 'prop-types';
import { Box, Skeleton, Button, Stack, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';

import IngredientChip from './ingredint-chip';

export default function SearchResultsIngredients({
  results,
  isLoading,
  onSelect,
  selectedIngredients,
  onAddNewIngredient,
}) {
  const { t } = useTranslate();
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, pl: 1, pb: 8 }}>
      {!isLoading ? (
        results.length ? (
          results.map((ingredient) => {
            const isSelected = selectedIngredients.some((ing) => ing.ingredientId === ingredient.id);
            return (
              <IngredientChip
                key={ingredient.id}
                ingredient={ingredient}
                isSelected={isSelected}
                onSelect={onSelect}
              />
            );
          })
        ) : (
          <Stack spacing={2} alignItems="center" sx={{ width: '100%', py: 2 }}>
            <Typography variant="caption" sx={{ mt: 1, color: 'text.disabled', textAlign: 'center' }}>
              {t('noIngredientFound')}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              onClick={onAddNewIngredient}
            >
              {t('addNewIngredient')}
            </Button>
          </Stack>
        )
      ) : (
        [...Array(5)].map((_, key) => (
          <Skeleton key={key} height={25} sx={{ minWidth: 110, borderRadius: 2 }} />
        ))
      )}
    </Box>
  );
}

SearchResultsIngredients.propTypes = {
  results: PropTypes.array,
  isLoading: PropTypes.bool,
  onSelect: PropTypes.func,
  selectedIngredients: PropTypes.array,
  onAddNewIngredient: PropTypes.func,
};
