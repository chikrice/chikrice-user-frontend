import {
  Stack,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Radio,
  Divider,
  Typography,
} from '@mui/material';

import Label from 'src/components/label';
import { useTranslate } from 'src/locales';

import type { UserClient } from 'chikrice-types';

// -------------------------------------

interface UserGoalProps {
  user: UserClient;
}

export default function UserGoal({ user }: UserGoalProps) {
  const { t } = useTranslate();

  return (
    <>
      <Stack mt={2}>
        <Typography variant="h4" mb={1} mx={1}>
          {t('goal')}
        </Typography>
        <Card
          sx={{
            backgroundColor: (theme) => theme.palette.background.paper,
            boxShadow: (theme) => theme.customShadows.card,
            py: 1,
            px: 2,
          }}
        >
          <List sx={{ color: 'text.secondary' }}>
            <ListItem>
              <ListItemIcon>
                <Radio color="error" checked={true} />
              </ListItemIcon>
              <ListItemText primary={t('startWeight')} />
              <Label>{user?.startWeight}kg</Label>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <Radio color="info" checked={true} />
              </ListItemIcon>
              <ListItemText primary={t('currentWeight')} />
              <Label>{user?.currentWeight}kg</Label>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <Radio color="success" checked={true} />
              </ListItemIcon>
              <ListItemText primary={t('targetWeight')} />
              <Label>{user?.targetWeight}kg</Label>
            </ListItem>
          </List>
        </Card>
      </Stack>
    </>
  );
}
