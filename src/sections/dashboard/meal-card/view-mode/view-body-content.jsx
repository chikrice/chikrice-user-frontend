import { Box, ListItem, ListItemIcon, Stack, Typography } from '@mui/material';

import { useLocales } from 'src/locales';

export default function ViewBodyContent({ ingredients }) {
  const { lang } = useLocales();

  return (
    <Stack>
      {ingredients.map((item, index) => (
        <ListItem key={index} sx={{ pl: 0 }}>
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
