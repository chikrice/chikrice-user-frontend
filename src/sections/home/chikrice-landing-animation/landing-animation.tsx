import { Box, Typography, Stack, Button, Container } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import { useRouter } from 'src/routes/hooks';

import AnimatedSVG from './animated-svg';

interface ChikriceLandingAnimationProps {
  onCallToAction: () => void;
}

export default function ChikriceLandingAnimation({ onCallToAction }: ChikriceLandingAnimationProps) {
  const { t } = useTranslate();
  const router = useRouter();

  return (
    <Box sx={{ mt: 25 }}>
      <Container>
        <Typography variant="h1">{t('heroTitle')}</Typography>
        <Typography variant="h5" color={'text.secondary'} fontWeight={400} mb={4}>
          {t('heroSubtitle')}
        </Typography>

        <Stack mt={4} gap={1} sx={{ width: '100%', maxWidth: 350, mx: 'auto', flexDirection: { sm: 'row' } }}>
          <Button fullWidth size="large" variant="contained" onClick={onCallToAction}>
            {t('startForFree')}
          </Button>
          <Button fullWidth size="large" variant="outlined" onClick={() => router.push(paths.auth.login)}>
            {t('login')}
          </Button>
        </Stack>
      </Container>
      <Box sx={{ mt: { xs: 10, md: 0 }, overflowAnchor: 'none' }}>
        <AnimatedSVG />
      </Box>
    </Box>
  );
}
