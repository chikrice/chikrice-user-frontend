import PropTypes from 'prop-types';
import { Box, Skeleton, Typography } from '@mui/material';

import IngredientChip from './ingredint-chip';

export default function NutrientGroup({ title, ingredients, onSelect, isLoading, selectedIngredients }) {
  return (
    <Box>
      <Typography pl={1.5} variant="subtitle2" textTransform={'capitalize'}>
        {title}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          width: '100%',
          height: '50px',
          gap: 1,
          scrollSnapType: 'x mandatory',
          '::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar
          pr: 3,
          pl: 1,
        }}
      >
        {!isLoading
          ? ingredients.map((ingredient) => {
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
          : [...Array(5)].map((_, key) => (
              <Skeleton key={key} height={25} sx={{ minWidth: 110, borderRadius: 2 }} />
            ))}
      </Box>
    </Box>
  );
}

NutrientGroup.propTypes = {
  title: PropTypes.string,
  onSelect: PropTypes.func,
  isLoading: PropTypes.bool,
  ingredients: PropTypes.array,
  selectedIngredients: PropTypes.array,
};
