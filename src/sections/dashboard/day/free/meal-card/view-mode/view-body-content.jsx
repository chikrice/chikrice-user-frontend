import PropTypes from 'prop-types';
import { Box, ListItem, ListItemIcon, Stack, Typography } from '@mui/material';

import { useLocales, useTranslate } from 'src/locales';

export default function ViewBodyContent({ ingredients, mealNotes }) {
  const { lang } = useLocales();
  const { t } = useTranslate();

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

      {!!mealNotes && (
        <Stack pt={1} sx={{ borderTop: (theme) => `solid 1px ${theme.palette.divider}` }}>
          <Typography variant="h6">{t('notes')}</Typography>
          <Typography variant="body2" color="text.secondary">
            {mealNotes}
          </Typography>
        </Stack>
      )}
    </Stack>
  );
}

ViewBodyContent.propTypes = {
  ingredients: PropTypes.array,
  mealNotes: PropTypes.string,
};
