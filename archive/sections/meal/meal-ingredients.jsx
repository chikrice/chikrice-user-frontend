//import PropTypes from 'prop-types';

import { Divider, List, ListItem, ListItemIcon, Stack, Typography } from '@mui/material';

export default function MealIngredients() {
  return (
    <Stack sx={{ mt: 3, px: 1 }}>
      <List sx={{ color: 'text.secondary' }}>
        <Divider />
        <ListItem color={'text.secondary'}>
          <ListItemIcon>1.</ListItemIcon>
          <Typography>Tuna</Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>2.</ListItemIcon>
          <Typography>lettuce</Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>3.</ListItemIcon>
          <Typography>tomato</Typography>
        </ListItem>
        <Divider />
      </List>
    </Stack>
  );
}

//MealIngredients.propTypes = {}
