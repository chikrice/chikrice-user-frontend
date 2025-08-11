import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import ButtonBase from '@mui/material/ButtonBase';

import SvgColor from '../../svg-color';
import { getButtonStyles } from './base-button-styles';

// ----------------------------------------------------------------------

export default function BaseOptions({ icons, options, value, onChange }) {
  return (
    <Stack direction="row" spacing={2}>
      {options.map((option, index) => {
        const selected = value === option;

        return (
          <ButtonBase
            key={option}
            onClick={() => onChange(option)}
            sx={(theme) => getButtonStyles(theme, selected)}
          >
            <SvgColor src={`/assets/icons/setting/ic_${index === 0 ? icons[0] : icons[1]}.svg`} />
          </ButtonBase>
        );
      })}
    </Stack>
  );
}

BaseOptions.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.string,
};
