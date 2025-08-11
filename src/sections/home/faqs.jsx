import { m } from 'framer-motion';
import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import AccordionList from 'src/components/accordion-list';
import { varFade, MotionViewport } from 'src/components/animate';

export default function Faqs() {
  const { t } = useTranslate();

  const router = useRouter();

  const faqs = [
    {
      id: 1,
      heading: t(`homeFaqs1Title`),
      detail: t('homeFaqs1Desc'),
    },
  ];

  return (
    <Box mt={{ xs: 20, lg: 30 }} component={MotionViewport}>
      <Stack component={m.div} variants={varFade().inUp}>
        <Typography variant="subtitle2" mb={3} color={'text.secondary'}>
          {t('faqs')}
        </Typography>
        <Typography variant="h2">{t('faqsTitle')}</Typography>

        <Typography mt={1}>{t('faqsDesc')}</Typography>
      </Stack>
      <Stack
        component={m.div}
        mt={6}
        sx={{ maxWidth: 700, mx: 'auto', textAlign: 'left' }}
        variants={varFade().inUp}
      >
        <AccordionList list={faqs} />
      </Stack>

      <Stack
        mt={8}
        py={4}
        component={m.div}
        variants={varFade().inUp}
        sx={{
          maxWidth: 500,
          mx: 'auto',
          borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h5">{t('stillHaveQuestions')} ?</Typography>
        <Typography variant="body2" color={'text.secondary'}>
          {t('describeYourQuestion')}
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 4, mx: 'auto', width: 'fit-content' }}
          startIcon={<Iconify icon="mdi:email" />}
          onClick={() => router.push(paths.contact)}
        >
          {t('contact')}
        </Button>
      </Stack>
    </Box>
  );
}
