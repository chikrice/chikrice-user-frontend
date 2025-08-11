import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';

export default function ColorPreview({ colors, limit = 3, sx }) {
  const uniqueColorsSet = new Set();

  const uniqueColors = colors.filter((color) => {
    if (!uniqueColorsSet.has(color.value)) {
      uniqueColorsSet.add(color.value);
      return true;
    }
    return false;
  });

  const remainingColors = uniqueColors.slice(limit);
  const remainingColorCount = Math.max(remainingColors.length, 0);

  const displayedColors = uniqueColors.slice(0, limit);

  return (
    <Stack component="span" direction="row" alignItems="center" justifyContent="flex-end" sx={sx}>
      {displayedColors.map((color, index) => (
        <Box
          key={index}
          sx={{
            ml: -0.75,
            width: 16,
            height: 16,
            bgcolor: color.value,
            borderRadius: '50%',
            border: (theme) => `solid 2px ${theme.palette.background.paper}`,
            boxShadow: (theme) => `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`,
          }}
        />
      ))}

      {remainingColorCount > 0 && (
        <Box component="span" sx={{ typography: 'subtitle2' }}>{`+${remainingColorCount}`}</Box>
      )}
    </Stack>
  );
}

ColorPreview.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.object),
  limit: PropTypes.number,
  sx: PropTypes.object,
};
