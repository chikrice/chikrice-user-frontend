import { useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';

import Image from 'src/components/image';
import imgUrl from 'src/assets/images/salad-1.png';
import MarkdownDescription from 'src/components/markdown';
import CustomGroupToggler from 'src/components/group-toggler/group-toggler';

import MealIngredients from '../meal-ingredients';
import MealOrderActions from '../meal-order-actions';
import MealNutritionFact from '../meal-nutrition-facts';

const description =
  '<p>الاشتراك العام يتيح لك اختيار عدد الوجبات اليومية بما يتناسب مع احتياجاتك ونمط حياتك. تتميز خطط الاشتراك العام بالمرونة.</p>';

export default function MealView() {
  const [activeGroup, setActiveGroup] = useState('nutrientFacts');

  const handleChangeGroup = (value) => {
    setActiveGroup(value);
  };

  return (
    <Box>
      <Box
        sx={{
          height: '40vh',
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          backgroundColor: (theme) => theme.palette.card.default,
        }}
      >
        <Image src={imgUrl} alt="meal" style={{ width: '70%', mx: 'auto' }} />
      </Box>

      <Container sx={{ pb: 30 }}>
        <Stack sx={{ mt: 2 }}>
          <Typography variant="h2" fontSize={'2rem'}>
            سلطة التونا اليونانيه
          </Typography>
        </Stack>

        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 3 }}>
          <Stack>
            <Typography variant="subtitle2" color={'text.secondary'}>
              Single
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography variant="h3" sx={{ fontSize: '1.5rem', mx: 0.5 }}>
                49
              </Typography>
              <span>AED</span>
            </Box>
          </Stack>
          <Stack>
            <Typography variant="subtitle2" color={'text.secondary'}>
              Subscription
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'baseline',
              }}
            >
              <Typography
                sx={{
                  fontSize: '1.5rem',
                  mx: 0.5,
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }}
              >
                49
              </Typography>
              <Typography variant="h3" sx={{ fontSize: '1.5rem' }}>
                37
              </Typography>
              <span>AED</span>
            </Box>
          </Stack>
        </Box>

        <MarkdownDescription description={description} />

        <CustomGroupToggler
          groupOneValue={'nutrientFacts'}
          groupTwoValue={'ingredients'}
          activeGroup={activeGroup}
          onToggle={handleChangeGroup}
          sx={{ mt: 4 }}
        />
        {activeGroup === 'ingredients' ? <MealIngredients /> : <MealNutritionFact />}
      </Container>

      <MealOrderActions />
    </Box>
  );
}
