import { useLocation } from 'react-router-dom';
import { Box, Button, Container, Stack, Typography } from '@mui/material';

import Image from 'src/components/image';
import { useTranslate } from 'src/locales';
import PlanDetailsDescription from 'src/components/markdown';
import { useCheckoutContext } from 'src/sections/checkout/context';
import customPlanSrc from 'src/assets/illustrations/custom-plan.png';
import { useTranslatePlanHeader } from 'src/locales/hooks/translate';

import CustomPlanSteps from '../custom/custom-plan-steps';

export default function CustomPlanView() {
  const { t } = useTranslate();
  const { state } = useLocation();

  const checkout = useCheckoutContext();
  const { translateHeader } = useTranslatePlanHeader();

  return (
    <Container sx={{ pb: 20 }}>
      <Stack>
        <Image
          src={customPlanSrc}
          alt={'custom plan'}
          sx={{ width: 250, mx: 'auto' }}
          ratio={'1/1'}
        />

        <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', mt: 2 }}>
          <Stack>
            <Typography variant="h3">{t(state.title)}</Typography>
            <Typography variant="subtitle2" color={'text.secondary'}>
              {translateHeader(state)}
            </Typography>
          </Stack>
          <Typography variant="h2">{state.price}AED</Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          size="large"
          onClick={() => checkout.onAddToCart(state)}
        >
          {t('placeOrder')}
        </Button>
      </Stack>
      <Stack sx={{ mt: 3 }}>
        <PlanDetailsDescription description={state.description} />
      </Stack>

      <CustomPlanSteps plan={state} />
    </Container>
  );
}
