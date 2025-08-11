import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import { Box, Container, Divider, Radio, Stack, Typography } from '@mui/material';

import Image from 'src/components/image';
import { useTranslate } from 'src/locales';
import Searchbar from 'src/layouts/common/searchbar';
import EmptyContent from 'src/components/empty-content';
import CustomBottomDrawer from 'src/components/custom-drawer/custom-drawer';
import FoodCategories from 'src/components/food-categories/food-categories';

import { mealsData } from '../../data';
import AlternativesMealCard from './alternatives-meal-card-premum';

//-----------------------------------------------------------------------

export default function AlternativesDrawerPremium({
  open,
  onOpen,
  onClose,
  currentMeal,
  alternatives,
}) {
  const { t } = useTranslate();

  const [heldCategory, setHeldCategory] = useState('all');

  const alternativesMeals = mealsData.filter((meal) => alternatives.includes(meal.id));

  const filteredAlternatives = alternativesMeals.filter(
    (meal) => heldCategory === 'all' || meal.category === heldCategory
  );

  const isEmptyAlternatives = filteredAlternatives.length === 0;

  const handleCategoryChange = useCallback(
    (item) => {
      setHeldCategory(item.title);
    },
    [setHeldCategory]
  );

  const handleMealChange = (newMeal) => {
    console.log(newMeal);
  };

  const renderCurrentMeal = (
    <Stack>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Radio checked={true} color="primary" sx={{ p: 0 }} />
        <Typography color={'text.secondary'} sx={{ fontSize: '13px', fontWeight: 'bold' }}>
          {t('currentMeal')}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          pt: 0,
          pb: 2,
          pl: 3.5,
        }}
      >
        <Box sx={{ width: '60%' }}>
          <Typography variant="h5">{currentMeal.name.ar}</Typography>
          <Typography variant="body2" color={'text.secondary'}>
            {currentMeal.name.en}
          </Typography>
        </Box>
        <Stack sx={{ width: '30%', position: 'absolute', right: '5%' }}>
          <Image
            src={currentMeal.imgUrl}
            alt={'meal'}
            sx={{
              width: '50%',
              mx: 'auto',
              ratio: '1/1',
            }}
          />
          <Typography
            variant="body2"
            color={'text.secondary'}
            sx={{ textAlign: 'center', fontWeight: 'bold' }}
          >
            {currentMeal.calorie} cal
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );

  const renderAlternatives = (
    <Box sx={{ mt: 1 }}>
      <Typography variant="h5"> Change with</Typography>
      <Stack sx={{ mt: 0.5 }} spacing={1}>
        {isEmptyAlternatives ? (
          <EmptyContent title={'No alternatives for this category'} sx={{ mt: 2 }} />
        ) : (
          filteredAlternatives.map((meal) => (
            <AlternativesMealCard key={meal.id} meal={meal} onClick={handleMealChange} />
          ))
        )}
      </Stack>
    </Box>
  );

  return (
    <CustomBottomDrawer open={open} onOpen={onOpen} onClose={onClose} height="80svh">
      <Container>
        {renderCurrentMeal}

        <Divider sx={{ borderStyle: 'dashed', mb: 1.5 }} />

        <Searchbar />

        <FoodCategories heldCategory={heldCategory} onChange={handleCategoryChange} />

        {renderAlternatives}
      </Container>
    </CustomBottomDrawer>
  );
}

AlternativesDrawerPremium.propTypes = {
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  currentMeal: PropTypes.object,
  alternatives: PropTypes.array,
};
