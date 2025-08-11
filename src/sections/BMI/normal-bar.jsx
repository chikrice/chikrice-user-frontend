import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';
import { useTranslate } from 'src/locales';

export default function NormalBar({ minNormalWeight, maxNormalWeight }) {
  const theme = useTheme();
  const { t } = useTranslate();
  return (
    <Box sx={{ flex: 1, position: 'relative' }}>
      <Box>
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            top: -25,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {t('normal')}
        </Typography>
        <Box sx={{ width: '100%', height: 10, backgroundColor: theme.palette.success.main }} />
      </Box>
      <Box sx={{ flex: 1, backgroundColor: theme.palette.success.main }} />
      <Box
        sx={{
          position: 'absolute',
          height: 30,
          left: `0`,
          transform: 'translate(-50%,0)',
        }}
      >
        <Label sx={{ mt: 1 }}>{minNormalWeight}kg</Label>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          height: 30,
          right: `0`,
          transform: 'translate(50%,0)',
        }}
      >
        <Label sx={{ mt: 1 }}>{maxNormalWeight}kg</Label>
      </Box>
    </Box>
  );
}

NormalBar.propTypes = {
  minNormalWeight: PropTypes.string,
  maxNormalWeight: PropTypes.string,
};
