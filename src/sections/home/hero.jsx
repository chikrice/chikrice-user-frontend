import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { alpha, Box, Button, Stack, Typography } from '@mui/material';

import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import { useRouter } from 'src/routes/hooks';
import heroSrc from 'src/assets/images/2.jpg';
import { useResponsive } from 'src/hooks/use-responsive';
import { useSettingsContext } from 'src/components/settings';
import { MotionContainer, varFade } from 'src/components/animate';

export default function Hero({ onCallToAction }) {
  const theme = useTheme();
  const { t } = useTranslate();
  const { themeMode } = useSettingsContext();
  const mdDown = useResponsive('down', 'md');

  const router = useRouter();

  return (
    <Box
      component={MotionContainer}
      sx={{
        display: 'flex',
        alignItems: { xs: 'end', md: 'center' },
        justifyContent: 'center',
        height: '100svh',
        textAlign: 'center',
        minHeight: '800px',
        pb: { xs: '15svh', md: 0 },
      }}
    >
      <Stack flexDirection={{ md: 'row' }} alignItems={'center'} justifyContent={'space-between'}>
        <Image
          src={heroSrc}
          overlay={
            mdDown
              ? `linear-gradient(180deg, ${alpha(
                  theme.palette.background.default,
                  0.3
                )} 0%, ${alpha(theme.palette.background.default, 1)} 50%)`
              : ''
          }
          sx={{
            position: { xs: 'absolute', md: 'relative' },
            zIndex: '-1',
            top: 0,
            borderRadius: { md: 8 },
            minWidth: { md: 380 },
            minHeight: 400,
            width: { xs: '100%', md: '45%' },
            height: { xs: '100%', md: 'auto' },
            left: '0',
          }}
        />
        <m.div sx={{ maxWidth: 500 }} variants={varFade().inUp}>
          <Typography
            variant="h1"
            sx={{
              color: themeMode === 'light' ? 'black' : 'white',
            }}
          >
            {t('heroTitle')}
          </Typography>

          <Typography variant="body2" mt={2}>
            <b>CHIKRICE </b>
            {t('heroSubtitle')}
          </Typography>
          <Stack
            mt={4}
            gap={1}
            sx={{ width: '100%', maxWidth: 350, mx: 'auto', flexDirection: { sm: 'row' } }}
          >
            <Button fullWidth size="large" variant="contained" onClick={onCallToAction}>
              {t('startForFree')}
            </Button>
            <Button fullWidth size="large" variant="outlined" onClick={() => router.push(paths.auth.login)}>
              {t('login')}
            </Button>
          </Stack>
        </m.div>
      </Stack>
    </Box>
  );
}

Hero.propTypes = {
  onCallToAction: PropTypes.func,
};
