import { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import { Stack, Typography } from '@mui/material';
import StepContent from '@mui/material/StepContent';

import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import { useRouter } from 'src/routes/hooks';
import { useCheckoutContext } from 'src/sections/checkout/context';

export default function GeneralPlanSteps({ plan }) {
  const { t } = useTranslate();
  const router = useRouter();

  const checkout = useCheckoutContext();

  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = [
    {
      label: 'الطلب',
      description: 'قم بوضع طلبك وأكمل عملية الدفع',
      prevBtn: null,
      nextBtn: {
        title: t('placeOrder'),
        action: () => checkout.onAddToCart(plan),
        others: { size: 'large', color: 'primary', fullWidth: true },
      },
    },
    {
      label: 'تعدیل الوجبات',
      description: `بعد طلب خطتك، يمكنك فتح لوحة التحكم الخاصة بك لمشاهدة وجباتك اليومية للشهر بأكمله حيث يمكنك استكشاف القائمة وتعديل الوصفات من هناك`,
      prevBtn: { title: t('back'), action: handleBack },
      nextBtn: { title: t('goToDashboard'), action: () => router.push(paths.dashboard) },
    },
  ];

  return (
    <Stack sx={{ mt: 6, px: 1 }}>
      <Typography variant="h2" sx={{ textAlign: 'center', fontSize: '2.5em' }}>
        {t('steps')}
      </Typography>

      <Box sx={{ maxWidth: 400, mt: 4 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                onClick={() => setActiveStep(index)}
                optional={<Typography variant="caption">الخطوة {index + 1}</Typography>}
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                  <div style={{ paddingLeft: '2rem' }}>
                    <Button
                      variant="contained"
                      onClick={step.nextBtn.action}
                      sx={{ mt: 1, mr: 1 }}
                      {...(step.nextBtn.others || {})}
                    >
                      {step.nextBtn.title}
                    </Button>
                    {step.prevBtn && (
                      <Button
                        variant="outlined"
                        onClick={step.prevBtn.action}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {step.prevBtn.title}
                      </Button>
                    )}
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Stack>
  );
}

GeneralPlanSteps.propTypes = {
  plan: PropTypes.object,
};
