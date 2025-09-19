import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { Stepper, Step, StepLabel, Typography, Button, Stack, StepConnector, Container } from '@mui/material';

import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify/iconify';
import { useResponsive } from 'src/hooks/use-responsive';
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
  const mdUp = useResponsive('up', 'md');

  return (
    <Container mt={20} component={MotionViewport}>
      <Stack component={m.div} variants={varFade().inUp} textAlign={'start'}>
        <Typography variant="subtitle2" mb={3} color={'text.secondary'}>
          {t('howToStart')}
        </Typography>
        <Typography variant="h2">{t('steps')}</Typography>
      </Stack>

      <Stack sx={{ py: 3, width: '100%', alignItems: 'center' }} component={m.div} variants={varFade().inUp}>
        <Stepper
          orientation={mdUp ? 'horizontal' : 'vertical'}
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
              sx={{ width: '100%', mx: 'auto', maxWidth: 320, ml: 0, textAlign: 'left', mb: 1 }}
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
        {!mdUp && (
          <Button
            variant="contained"
            sx={{ mt: 3, maxWidth: 350 }}
            size="large"
            fullWidth
            onClick={onCallToAction}
          >
            {t('startNow')}
          </Button>
        )}
      </Stack>
    </Container>
  );
}

ProcessPlan.propTypes = {
  onCallToAction: PropTypes.func,
};
