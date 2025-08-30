import * as Yup from 'yup';
import { m } from 'framer-motion';
import { useSnackbar } from 'notistack';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';

import { useTranslate } from 'src/locales';
import { api, endpoints } from 'src/utils/axios';
import { varFade, MotionViewport } from 'src/components/animate';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function FaqsForm() {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();

  const faqSchema = Yup.object().shape({
    question: Yup.string().trim().required(t('questionRequired')),
  });

  const defaultValues = {
    question: '',
  };

  const methods = useForm({
    resolver: yupResolver(faqSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await api.post(endpoints.faqs, data);
      enqueueSnackbar(t('faqSendSuccess'));
      reset();
    } catch (error) {
      console.log(error);
      enqueueSnackbar(t('somethingWentWrong'), { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack component={MotionViewport} spacing={3}>
        {/* <m.div variants={varFade().inUp}>
        <Typography variant="h4">{t('faqs.notFoundTitle')}</Typography>
      </m.div> */}

        {/* <m.div variants={varFade().inUp}>
        <TextField fullWidth label={t('faqs.nameLabel')} />
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField fullWidth label={t('faqs.emailLabel')} />
      </m.div>

      <m.div variants={varFade().inUp}>
        <TextField fullWidth label={t('faqs.subjectLabel')} />
      </m.div> */}

        <m.div variants={varFade().inUp}>
          <RHFTextField name="question" fullWidth label={t('questionLabel')} multiline rows={4} />
        </m.div>

        <m.div variants={varFade().inUp}>
          <LoadingButton
            fullWidth
            color="inherit"
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {t('submit')}
          </LoadingButton>
        </m.div>
      </Stack>
    </FormProvider>
  );
}
