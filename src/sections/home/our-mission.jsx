import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Image from 'src/components/image';
import { useTranslate } from 'src/locales';
import missionSrc from 'src/assets/images/1.jpg';
import { varFade, MotionViewport } from 'src/components/animate';

export default function OurMission({ onCallToAction }) {
  const { t } = useTranslate();

  return (
    <Box mt={{ xs: 20, lg: 30 }} component={MotionViewport}>
      <Stack component={m.div} variants={varFade().inUp}>
        <Typography variant="subtitle2" mb={3} color={'text.secondary'}>
          {t('upliftEachother')}
        </Typography>
        <Typography variant="h2">{t('ourMission')}</Typography>

        <Typography mt={1} maxWidth={600} margin={'0 auto'}>
          {t('ourMissionText')}
        </Typography>
      </Stack>

      <Box component={m.div} variants={varFade().inUp} width={'100%'} sx={{ mt: 3 }}>
        <Image width={{ md: '50%' }} sx={{ borderRadius: 8 }} src={missionSrc} />
      </Box>
      <Button
        fullWidth
        size="large"
        variant="contained"
        sx={{ mt: 6, maxWidth: 350 }}
        onClick={onCallToAction}
      >
        {t('startForFree')}
      </Button>
    </Box>
  );
}

OurMission.propTypes = {
  onCallToAction: PropTypes.func,
};
