import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import Image from 'src/components/image';
import { useTranslate } from 'src/locales';
import bmiLoadingSrc from 'src/assets/illustrations/bmi-loading.png';

export default function BMILoading() {
  const { t } = useTranslate();

  return (
    <Stack
      sx={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100svh - 200px)',
      }}
    >
      <Image src={bmiLoadingSrc} alt={'bmi loading'} />
      <Typography variant="subtitle1" textAlign={'center'}>
        {t('bmiLoading')}
      </Typography>

      <CircularProgress sx={{ mt: 4 }} />
    </Stack>
  );
}
