import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { api, endpoints } from 'src/utils/axios';
import { useBoolean } from 'src/hooks/use-boolean';
import { Textarea } from 'src/components/hook-form/rhf-textarea';

interface MealInputAiProps {
  mealIndex: number;
}
export default function MealInputAi({ mealIndex }: MealInputAiProps) {
  const { t } = useTranslate();
  const loading = useBoolean(false);
  const user = useStore((state) => state.user);
  const toggleIngredient = useStore((state) => state.toggleIngredient);
  const [prompt, setPrompt] = useState<string>('');

  const handleEnterMeal = async (): Promise<void> => {
    try {
      loading.onTrue();
      const { data: ingredients } = await api.post(endpoints.user.processIngredients(user.id), { prompt });
      ingredients.forEach((ing) => toggleIngredient(ing, mealIndex));
    } catch (error) {
      console.error(error);
      enqueueSnackbar(error.message || 'Failed to process meal input, please try again', {
        variant: 'error',
      });
    } finally {
      setPrompt('');
      loading.onFalse();
    }
  };

  useEffect(() => {
    // Get all textarea elements and replace \\n with \n in the placeholder
    const textAreas = document.getElementsByTagName('textarea');
    Array.prototype.forEach.call(textAreas, function (elem: HTMLTextAreaElement) {
      elem.placeholder = elem.placeholder.replace(/\\n/g, '\n');
    });
  }, []);

  return (
    <Stack sx={{ px: 2, mt: 1, flexDirection: 'row' }} spacing={2}>
      <Textarea
        value={prompt}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setPrompt(e.target.value)}
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
