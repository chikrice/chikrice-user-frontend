import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

export default function UnderweightBar() {
  const theme = useTheme();
  const { t } = useTranslate();
  return (
    <Box sx={{ flex: 1, position: 'relative' }}>
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          whiteSpace: 'nowrap',
          top: -25,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {t('underWeight')}
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: 10,
          backgroundColor: theme.palette.warning.main,
          borderRadius: '5px 0 0 5px',
        }}
      />
    </Box>
  );
}
