import PropTypes from 'prop-types';
import { Box, Skeleton } from '@mui/material';

import Label from 'src/components/label';
import { useTranslate } from 'src/locales';

import { calorieInfoStyles } from './styles';

export default function CalorieInfo({ label, value, isLoading }) {
  const { t } = useTranslate();

  return (
    <Box sx={calorieInfoStyles}>
      <span>{t(label)}</span>
      {isLoading ? (
        <Skeleton variant="text" width={30} height={24} />
      ) : (
        <Label color="info" variant="ghost">
          {value}
        </Label>
      )}
    </Box>
  );
}

CalorieInfo.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  isLoading: PropTypes.bool,
};
