import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Button, Container, Link, Stack, Typography } from '@mui/material';

import Image from 'src/components/image';
import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import { RouterLink } from 'src/routes/components';
import { useCheckoutContext } from 'src/sections/checkout/context';
import { useTranslatePlanHeader } from 'src/locales/hooks/translate';
import generalPlanSrc from 'src/assets/illustrations/general-plan.png';
import { initialPlan } from 'src/sections/checkout/context/checkout-provider-new';

import GeneralPlanSteps from '../general/general-plan-steps';

export default function GeneralPlanView() {
  const { t } = useTranslate();
  const { state } = useLocation();

  const [plan, setPlan] = useState(initialPlan);

  const checkout = useCheckoutContext();
  const { translateHeader } = useTranslatePlanHeader();

  useEffect(() => {
    const { type, count, daysCount, price, discount } = state;

    const mealsInDay = type === 'meal' ? count : 0;
    const snacksInDay = type === 'snack' ? count : 0;
    const data = {
      type,
      title: `${count}  ${t(type)} ${t('aDay')}`,
      subtitle: t('generalPlan'),
      price,
      discount,
      daysCount,
      mealsInDay,
      snacksInDay,
      description: '',
      mealsCount: daysCount * mealsInDay,
      snacksCount: daysCount * snacksInDay,
    };
    data.title = translateHeader(data);
    setPlan(data);
    // eslint-disable-next-line
  }, [state, setPlan, t]);

  return (
    <Container sx={{ pb: 20 }}>
      <Stack>
        <Image
          src={generalPlanSrc}
          alt={'custom plan'}
          sx={{ width: 250, mx: 'auto' }}
          ratio={'1/1'}
        />

        <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', mt: 2 }}>
          <Stack>
            <Typography variant="h3">{plan.title}</Typography>
            <Typography variant="subtitle2" color={'text.secondary'}>
              {plan.subtitle}
            </Typography>
          </Stack>
          <Typography variant="h2">{plan.price}AED</Typography>
        </Box>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          size="large"
          onClick={() => checkout.onAddToCart(plan)}
        >
          {t('placeOrder')}
        </Button>
      </Stack>
      <Stack sx={{ mt: 6 }} spacing={1}>
        <Typography>
          الاشتراك العام يتيح لك اختيار عدد الوجبات اليومية بما يتناسب مع احتياجاتك ونمط حياتك.
          تتميز خطط الاشتراك العام بالمرونة، حيث يمكنك الاختيار من وجبة واحدة يومياً إلى أربع وجبات
          يومياً، بالإضافة إلى خطط الوجبات الخفيفة التي تشمل وجبة خفيفة واحدة يومياً أو وجبتين
          خفيفتين يومياً.
        </Typography>
        <Link component={RouterLink} href={`${paths.subscriptions.root}?category=general`}>
          اشتراکات الوجبات الخفیفه
        </Link>
        <Typography>
          عند اختيارك لعدد معين من الوجبات، على سبيل المثال، وجبة واحدة يومياً، ستحصل على وجبة واحدة
          يومياً لمدة أسبوع (7 أيام) في الوقت الذي تفضله.
        </Typography>
        <Link component={RouterLink} href={`${paths.subscriptions.root}?category=custom`}>
          إذا كنت تبحث عن نتائج مضمونة، تحقق من خطط الوجبات المخصصة لدينا.
        </Link>
      </Stack>

      <GeneralPlanSteps plan={plan} />
    </Container>
  );
}
