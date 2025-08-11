import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';

import Image from 'src/components/image';
import feat1ar from 'src/assets/images/feat1ar.png';
import feat2ar from 'src/assets/images/feat2ar.png';
import feat3ar from 'src/assets/images/feat3ar.png';
import feat1en from 'src/assets/images/feat1en.png';
import feat2en from 'src/assets/images/feat2en.png';
import feat3en from 'src/assets/images/feat3en.png';
import { useLocales, useTranslate } from 'src/locales';
import { MotionViewport, varFade } from 'src/components/animate';

export default function HowWeHelpYou({ onCallToAction }) {
  const { t } = useTranslate();
  const { lang } = useLocales();
  const isAr = lang === 'ar';

  return (
    <Box mt={{ xs: 20, lg: 30 }} component={MotionViewport}>
      <Stack component={m.div} variants={varFade().inUp}>
        <Typography variant="subtitle2" mb={3} color={'text.secondary'}>
          {t('whoWeAre')}
        </Typography>
        <Typography variant="h2">
          <span>chikrice</span> {t('solveYourPorblem')}
        </Typography>
      </Stack>

      <Stack spacing={2} mt={3} flexDirection={{ md: 'row' }}>
        <Card sx={{ width: '100%', borderRadius: 8 }} component={m.div} variants={varFade().inUp}>
          <CardHeader title={t('feature1Title')} subheader={t('feature1Subtitle')} />
          <CardContent>
            <Image src={isAr ? feat1ar : feat1en} sx={{ borderRadius: 2 }} />
          </CardContent>
        </Card>
        {/* <Card sx={{width: '100%'}}>
          <CardHeader title={t('feature2Title')} subheader={t('feature2Subtitle')} />
          <CardContent>
            <Image src={overwhelmSrc} />
          </CardContent>
        </Card> */}
        <Card sx={{ width: '100%', borderRadius: 8 }} component={m.div} variants={varFade().inUp}>
          <CardHeader title={t('feature3Title')} subheader={t('feature3Subtitle')} />
          <CardContent>
            <Image src={isAr ? feat2ar : feat2en} sx={{ borderRadius: 2 }} />
          </CardContent>
        </Card>
        <Card sx={{ width: '100%', borderRadius: 8 }} component={m.div} variants={varFade().inUp}>
          <CardHeader title={t('feature4Title')} subheader={t('feature4Subtitle')} />
          <CardContent>
            <Image src={isAr ? feat3ar : feat3en} sx={{ borderRadius: 2 }} />
          </CardContent>
        </Card>
      </Stack>
      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ mt: 5, maxWidth: 350 }}
        onClick={onCallToAction}
      >
        {t('startNow')}
      </Button>
    </Box>
  );
}

HowWeHelpYou.propTypes = {
  onCallToAction: PropTypes.func,
};
