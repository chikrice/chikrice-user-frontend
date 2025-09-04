import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useTranslate } from 'src/locales';

export default function OverweightBar() {
  const theme = useTheme();
  const { t } = useTranslate();
  return (
    <Box sx={{ flex: 1, position: 'relative' }}>
      <Typography
        variant="caption"
        sx={{
          whiteSpace: 'nowrap',
          position: 'absolute',
          top: -25,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {t('overWeight')}
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: 10,
          backgroundColor: theme.palette.error.main,
          borderRadius: '0 5px 5px 0',
        }}
      />
    </Box>
  );
}
