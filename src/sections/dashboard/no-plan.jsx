import { Button, Stack, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import { useRouter } from 'src/routes/hooks';

export default function NoActivePlan() {
  const { t } = useTranslate();
  const router = useRouter();

  return (
    <Stack sx={{ mt: '20svh', textAlign: 'cetner' }} spacing={1}>
      <Typography variant="h4" sx={{ textAlign: 'center', my: 1 }}>
        {t('noActivePlan')}
      </Typography>
      <Button
        variant="contained"
        sx={{ width: '85%', mx: 'auto' }}
        color="primary"
        onClick={() => router.push(paths.subscriptions.root)}
      >
        {t('exploreSubscriptions')}
      </Button>
      <Button sx={{ mt: 4, width: 'fit-content', mx: 'auto' }}>{t('howItWorks')}</Button>
    </Stack>
  );
}

// what should I do now?
// what is the most important thing?
// customer
// if you bought this plan how you wanted this app to work
// starting with normal plan
// let's say since I eat egg in morning and protein whey after workout
// I want launch and dinner
// 2 meals
// however I also want the abilit to add my macros as free to hit the target easily
//---
// so you would go and buy 2 meals subs
