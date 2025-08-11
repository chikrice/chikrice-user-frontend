// src/components/SpecialityChip.js
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';

import { useLocales } from 'src/locales';
import Iconify from 'src/components/iconify';

export default function SpecialityChip({ speciality, isSelected, onSelect }) {
  const { lang } = useLocales();
  return (
    <Chip
      key={speciality.id}
      variant={isSelected ? 'filled' : 'outlined'}
      label={speciality.name[lang]}
      avatar={
        <Iconify
          icon={isSelected ? 'uis:check' : 'fluent:add-circle-12-regular'}
          style={{ color: '#00b8d9' }}
        />
      }
      onClick={() => onSelect(speciality)}
      sx={{ borderRadius: 2, '& .MuiChip-label': { pt: '3px' } }}
    />
  );
}

SpecialityChip.propTypes = {
  speciality: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.object.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func.isRequired,
};
