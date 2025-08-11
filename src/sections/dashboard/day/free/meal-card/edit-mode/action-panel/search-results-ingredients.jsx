import PropTypes from 'prop-types';
import { Box, Skeleton } from '@mui/material';

import { useTranslate } from 'src/locales';
import EmptyContent from 'src/components/empty-content';

import IngredientChip from './ingredint-chip';

export default function SearchResultsIngredients({
  results,
  isLoading,
  onSelect,
  selectedIngredients,
}) {
  const { t } = useTranslate();
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, pl: 1, pb: 8 }}>
      {!isLoading ? (
        results.length ? (
          results.map((ingredient) => {
            const isSelected = selectedIngredients.some((ing) => ing.id === ingredient.id);
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
          <EmptyContent title={t('noIngredientFound')} />
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
};
