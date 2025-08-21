import PropTypes from 'prop-types';
import { Chip } from '@mui/material';

import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';

export default function IngredientChip({ ingredient, isSelected, onSelect }) {
  const { lang } = useLocales();

  return (
    <Chip
      key={ingredient.id}
      variant={isSelected ? 'filled' : ''}
      label={`${ingredient.name[lang]} ${ingredient.icon}`}
      avatar={
        <Iconify
          icon={isSelected ? 'uis:check' : 'fluent:add-circle-12-regular'}
          style={{ color: '#00b8d9' }}
        />
      }
      onClick={() => onSelect(ingredient.id)}
      sx={{ borderRadius: 2, '& .MuiChip-label': { pt: '3px' } }}
    />
  );
}

IngredientChip.propTypes = {
  ingredient: PropTypes.object,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
};
