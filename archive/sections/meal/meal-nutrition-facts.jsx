import { Divider, List, ListItem, Stack, Typography } from '@mui/material';

import Label from 'src/components/label';

export default function MealNutritionFact() {
  return (
    <Stack sx={{ mt: 3, px: 1 }}>
      <List sx={{ color: 'text.secondary' }}>
        <Divider />
        <ListItem>
          <Typography sx={{ width: '80%' }}>Calorie</Typography>
          <Label>100cal</Label>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography sx={{ width: '80%' }}>Carbs</Typography>
          <Label>100g</Label>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography sx={{ width: '80%' }}>Protein</Typography>
          <Label>100g</Label>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography sx={{ width: '80%' }}>Fats</Typography>
          <Label>100g</Label>
        </ListItem>
        <Divider />
      </List>
    </Stack>
  );
}
