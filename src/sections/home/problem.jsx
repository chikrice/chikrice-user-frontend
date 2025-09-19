import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { Box, Button, CardHeader, Container, Stack, Typography } from '@mui/material';

import Image from 'src/components/image';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import problemSrc from 'src/assets/images/problem.png';
import { useResponsive } from 'src/hooks/use-responsive';
import { MotionViewport, varFade } from 'src/components/animate';

export default function Problem({ onCallToAction }) {
  const { t } = useTranslate();

  const mdDown = useResponsive('down', 'md');

  return (
    <Container mt={10} component={MotionViewport}>
      <Box component={m.div} variants={varFade().inUp}>
        <Typography variant="subtitle2" mb={3} color={'text.secondary'}>
          {t('startNewChapter')}
        </Typography>
        <Typography variant="h2">{t('problemTitle')}</Typography>
        <Stack spacing={2} mt={2} maxWidth={600} margin={'0 auto'}>
          <Typography>{t('problemDesc1')}</Typography>
          <Typography>{t('problemDesc2')}</Typography>
        </Stack>
      </Box>

      <Stack justifyContent={'space-around'} flexDirection={{ md: 'row' }} alignItems={'center'} mt={6}>
        <Stack spacing={3} textAlign={'left'} component={m.div} variants={varFade().inUp}>
          <CardHeader
            sx={{ alignItems: 'start', p: 0 }}
            title={t('key1Title')}
            subheader={t('key1Desc')}
            avatar={<Iconify width={30} icon="hugeicons:knowledge-01" />}
          />
          <CardHeader
            sx={{ alignItems: 'start', p: 0 }}
            title={t('key2Title')}
            subheader={t('key2Desc')}
            avatar={<Iconify width={30} icon="solar:running-line-duotone" />}
          />
          <CardHeader
            sx={{ alignItems: 'start', p: 0 }}
            title={t('key3Title')}
            subheader={t('habit') + ' ' + t('key3Desc')}
            avatar={<Iconify width={30} icon="arcticons:habit-tracker" />}
          />

          <Button variant="contained" sx={{ mt: 2, maxWidth: 350 }} size="large" onClick={onCallToAction}>
            {t('startNow')}
          </Button>
        </Stack>
        <Box
          component={m.div}
          variants={varFade().inUp}
          sx={{ display: mdDown ? 'none' : '', width: { xs: '100%', md: '30%' }, height: 450 }}
        >
          <Image width={'100%'} height={'100%'} sx={{ borderRadius: 8 }} src={problemSrc} />
        </Box>
        {/* iamge here */}
      </Stack>
    </Container>
  );
}

Problem.propTypes = {
  onCallToAction: PropTypes.func,
};
