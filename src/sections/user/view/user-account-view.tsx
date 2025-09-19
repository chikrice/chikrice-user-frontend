import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { enqueueSnackbar } from 'notistack';
import ListItem from '@mui/material/ListItem';
import { Button, Stack } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import useStore from 'src/store';
import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hooks';
import { RightIcon } from 'src/components/carousel/arrow-icons';

// -------------------------------------

export default function UserAccountView() {
  const logout = useStore((state) => state.logout);
  const user = useStore((state) => state.user);
  const isCoach = user?.role === 'coach';

  const { t } = useTranslate();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const accountRoutesConfig = [
    {
      title: t('profile'),
      icon: 'fluent:person-28-regular',
      path: isCoach ? paths.user.coach : paths.user.profile,
    },
    {
      title: t('ingredients'),
      icon: 'fluent:food-apple-20-regular',
      path: paths.user.ingredients,
    },
    {
      title: t('settings'),
      icon: 'fluent:settings-20-regular',
      path: paths.user.settings,
    },
    {
      title: t('needHelp'),
      icon: 'material-symbols:question-mark-rounded',
      path: paths.faqs,
    },
  ];

  return (
    <Box sx={{ pt: 5 }}>
      <List>
        {accountRoutesConfig.map((item, index) => (
          <Box key={index} onClick={() => router.push(item.path)}>
            <ListItem sx={{ p: 0 }}>
              <ListItemButton sx={{ p: 2 }}>
                <ListItemIcon>
                  <Iconify icon={item.icon} />
                </ListItemIcon>
                <ListItemText primary={item.title} />
                <RightIcon />
              </ListItemButton>
            </ListItem>
            <Divider />
          </Box>
        ))}
      </List>

      <Stack sx={{ position: 'absolute', bottom: 120, width: '98%', px: 2 }}>
        <Button variant="outlined" color="error" onClick={handleLogout}>
          {t('logout')}
        </Button>
      </Stack>
    </Box>
  );
}
