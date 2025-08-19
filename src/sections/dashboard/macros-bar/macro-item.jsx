import PropTypes from 'prop-types';
import { Box, Skeleton } from '@mui/material';

import { useTranslate } from 'src/locales';

export default function MacroItem({ icon, label, value, isLoading }) {
  const { t } = useTranslate();

  return (
    <Box display="flex" alignItems="center" gap={0.5} sx={{ width: 'fit-content' }}>
      {icon} {t(label)} (
      {isLoading ? <Skeleton variant="text" width={15} height={20} /> : `${value}g`})
    </Box>
  );
}

MacroItem.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  value: PropTypes.string,
  isLoading: PropTypes.bool,
};
