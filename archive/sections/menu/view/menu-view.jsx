import { Stack } from '@mui/material';
import { useCallback, useState } from 'react';
import Container from '@mui/material/Container';

import Searchbar from 'src/layouts/common/searchbar';
import FoodCategories from 'src/components/food-categories/food-categories';

import MenuItem from '../menu-item';
// import { HomeSkeleton } from '../home-skeleton';
// ----------------------------------------------------------------------

export default function MenuView() {
  const [heldCategory, setHeldCategory] = useState('all');

  const handleCategoryChange = useCallback(
    (item) => {
      setHeldCategory(item.title);
    },
    [setHeldCategory]
  );

  return (
    <Container>
      <Searchbar />

      <FoodCategories heldCategory={heldCategory} onChange={handleCategoryChange} />

      <Stack>
        <MenuItem />
      </Stack>
    </Container>
  );
}
