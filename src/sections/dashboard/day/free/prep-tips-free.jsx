//import PropTypes from 'prop-types';

import { Stack, Typography } from '@mui/material';

import AccordionList from 'src/components/accordion-list';

import PrepTipsDosDonts from '../common/prep-tips-dos-donts';

export default function PrepTipsFree() {
  return (
    <>
      <Stack mt={10}>
        <Typography variant="h2" textAlign={'center'} mb={1}>
          Tips & Tricks
        </Typography>

        <AccordionList
          className={'dash__tour__6'}
          list={[
            {
              id: 1,
              heading: 'كيفية تحضير البيض؟',
              detail:
                'يمكنك طهي البيض بأي طريقة تريدها فقط تأكد من استخدام رذاذ الزيت إذا كنت ستقوم بقليه. يمكنك إضافة الكثير من الخضار والتوابل حسب رغبتك.',
            },
            {
              id: 2,
              heading: 'كيفية تحضير الدجاج؟',
              detail:
                'يمكنك شوائها أو طبخها. القاعدة الوحيدة هي استخدام القليل من الزيت. لتسهيل التحضير، نوصيك بتتبيل الدجاج مسبقًا، وعندما تريد تناوله ضع قطعة في المقلاة الهوائية أو اشويها في مقلاة عادية باستخدام رذاذ الزيت.',
            },
          ]}
        />
      </Stack>

      <PrepTipsDosDonts title="allowed" alertSeverity="success" list={['allowed1', 'ho']} />
      <PrepTipsDosDonts title="notAllowed" alertSeverity="error" list={['allowed1', 'ho']} />
    </>
  );
}

//PrepTipsFree.propTypes = {}
