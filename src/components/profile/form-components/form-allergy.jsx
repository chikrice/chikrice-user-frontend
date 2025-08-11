import PropTypes from 'prop-types';
import { Box, Card, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { useTranslate } from 'src/locales';

import FormLayout from './form-layout';

export default function AllergySelectionInput({ allergicFoods }) {
  const { t } = useTranslate();
  const { control, setValue } = useFormContext();

  const allergicOptions = [
    { id: 1, value: 'peanuts', icon: '🥜' },
    { id: 2, value: 'shellfish', icon: '🦐' },
    { id: 3, value: 'milk', icon: '🥛' },
    { id: 4, value: 'eggs', icon: '🥚' },
    { id: 5, value: 'wheat', icon: '🌾' },
    { id: 6, value: 'soy', icon: '🌱' },
    { id: 7, value: 'treeNuts', icon: '🌰' },
    { id: 8, value: 'fish', icon: '🐟' },
  ];

  const handleSelectFood = (value) => {
    const updatedAllergicFoods = allergicFoods.includes(value)
      ? allergicFoods.filter((food) => food !== value)
      : [...allergicFoods, value];

    setValue('allergicFoods', updatedAllergicFoods);
  };

  return (
    <Controller
      name="allergicFoods"
      control={control}
      defaultValue={allergicFoods}
      render={() => (
        <FormLayout title={t('allergicFoods')} description={t('selectAllergicFoods')}>
          <Box
            sx={{
              maxWidth: 800,
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 1.5,
            }}
          >
            {allergicOptions.map((option) => (
              <Card
                key={option.id}
                onClick={() => handleSelectFood(option.value)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: 6,
                  py: 1.5,
                  px: 2.2,
                  cursor: 'pointer',
                  border: (theme) =>
                    allergicFoods.includes(option.value)
                      ? `solid ${theme.palette.primary.main}`
                      : 'none',
                }}
              >
                <Typography variant="h4" sx={{ marginRight: 1 }}>
                  {option.icon}
                </Typography>
                <Typography component="div" variant="h6">
                  {t(option.value)}
                </Typography>
              </Card>
            ))}
          </Box>
        </FormLayout>
      )}
    />
  );
}

AllergySelectionInput.propTypes = {
  allergicFoods: PropTypes.array.isRequired,
};
