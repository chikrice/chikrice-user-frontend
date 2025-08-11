import { mutate } from 'swr';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';

import { useTranslate } from 'src/locales';
import { endpoints } from 'src/utils/axios';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { submitMealWithAi } from 'src/api/plan-day';
import { Textarea } from 'src/components/hook-form/rhf-textarea';

export default function MealInputAi({ planDayId, mealId }) {
  const { t } = useTranslate();
  const loading = useBoolean(false);
  const [prompt, setPrompt] = useState('');

  const handleEnterMeal = async () => {
    try {
      loading.onTrue();
      await submitMealWithAi(planDayId, { prompt, mealId });
    } catch (error) {
      console.error(error);
      loading.onFalse();
    } finally {
      // get the plan day new data
      mutate(endpoints.plan_day.root(planDayId));
      setPrompt('');
      loading.onFalse();
    }
  };

  useEffect(() => {
    // Get all textarea elements and replace \\n with \n in the placeholder
    const textAreas = document.getElementsByTagName('textarea');
    Array.prototype.forEach.call(textAreas, function (elem) {
      elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
    });
  }, []);

  return (
    <Stack sx={{ px: 2, mt: 1, flexDirection: 'row' }} spacing={2}>
      <Textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        minRows={2}
        placeholder={`- ${t('aiPlaceholder1')}  \n- ${t('aiPlaceholder2')} `}
        style={{ width: '100%', maxHeight: '150px', borderRadius: 30 }}
      />

      <LoadingButton
        variant="contained"
        sx={{ height: '50px', minWidth: '50px', p: 0, borderRadius: '50%' }}
        disabled={!prompt}
        loading={loading.value}
        onClick={handleEnterMeal}
      >
        <Iconify icon={`${!prompt ? 'ph:plus-circle-bold' : 'pajamas:check'}`} width={25} />
      </LoadingButton>
    </Stack>
  );
}

MealInputAi.propTypes = {
  planDayId: PropTypes.string,
  mealId: PropTypes.string,
};
