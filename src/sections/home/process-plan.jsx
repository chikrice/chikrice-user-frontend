import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
  Button,
  Stack,
  StepConnector,
} from '@mui/material';

import Image from 'src/components/image';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify/iconify';
import processSrc from 'src/assets/images/process.png';
import { MotionViewport, varFade } from 'src/components/animate';

const steps = [
  {
    title: 'enterDetails',
    description: 'enterBodyAndGoal',
  },
  {
    title: 'getRoadmap',
    description: 'getRoadmapDetails',
  },
  {
    title: 'startYourJourney',
    description: 'guidenceDesc',
  },
];

const numberIcons = ['mdi:numeric-1-circle', 'mdi:numeric-2-circle', 'mdi:numeric-3-circle'];

const HiddenStepConnector = () => <StepConnector sx={{ visibility: 'hidden' }} />;

export default function ProcessPlan({ onCallToAction }) {
  const { t } = useTranslate();

  return (
    <Box mt={{ xs: 20, lg: 30 }} component={MotionViewport}>
      <Stack component={m.div} variants={varFade().inUp}>
        <Typography variant="subtitle2" mb={3} color={'text.secondary'}>
          {t('howToStart')}
        </Typography>
        <Typography variant="h2">{t('steps')}</Typography>

        <Typography mt={1}>{t('stepsDesc1')}</Typography>
      </Stack>

      <Stack flexDirection={{ md: 'row', alignItems: 'start' }} mt={6}>
        <Box
          width={'100%'}
          height={450}
          sx={{ display: { xs: 'none', md: 'block' } }}
          component={m.div}
          variants={varFade().inUp}
        >
          <Image width={'60%'} height={'100%'} sx={{ borderRadius: 8 }} src={processSrc} />
        </Box>
        <Stack
          sx={{ py: 3, width: '100%', alignItems: 'center' }}
          component={m.div}
          variants={varFade().inUp}
        >
          <Stepper
            orientation={'vertical'}
            activeStep={steps.length - 1}
            connector={<HiddenStepConnector />}
            sx={{
              alignItems: 'start',
              width: '100%',
              '&.MuiStepConnector-root': { visibility: 'hidden' },
            }}
          >
            {steps.map((step, index) => (
              <Step
                key={index}
                sx={{ width: '100%', mx: 'auto', maxWidth: 320, textAlign: 'left', mb: 1 }}
              >
                <StepLabel
                  sx={{ alignItems: 'start' }}
                  StepIconComponent={() => (
                    <Iconify
                      icon={numberIcons[index] || 'mdi:checkbox-blank-circle-outline'}
                      width={34}
                      height={34}
                      color="primary"
                    />
                  )}
                >
                  <Typography variant="h5" style={{ marginBottom: '4px' }}>
                    {t(step.title)}
                  </Typography>
                  <Typography variant="body2" color={'text.secondary'}>
                    {t(step.description)}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <Button
            variant="contained"
            sx={{ mt: 3, maxWidth: 350 }}
            size="large"
            fullWidth
            onClick={onCallToAction}
          >
            {t('startNow')}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

ProcessPlan.propTypes = {
  onCallToAction: PropTypes.func,
};
