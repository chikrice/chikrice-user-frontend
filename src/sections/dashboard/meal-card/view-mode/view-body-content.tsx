import { Box, ListItem, ListItemIcon, Stack, Typography } from '@mui/material';

import { useLocales } from 'src/locales';

import type { Ingredient } from 'chikrice-types';

// -------------------------------------

interface ViewBodyContentProps {
  ingredients: Ingredient[];
}

// -------------------------------------

export default function ViewBodyContent({ ingredients }: ViewBodyContentProps) {
  const { lang } = useLocales();

  return (
    <Stack>
      {ingredients.map((item) => (
        <ListItem key={item.id} sx={{ pl: 0 }}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle2" color={'text.secondary'}>
              {item.name[lang]}
            </Typography>

            <Typography variant="body2" color={'text.secondary'}>
              ~ {item.portion.qty + ' ' + item.portion.label[lang]} ({item.portion.weightInGrams}g)
            </Typography>
          </Box>
        </ListItem>
      ))}
    </Stack>
  );
}
