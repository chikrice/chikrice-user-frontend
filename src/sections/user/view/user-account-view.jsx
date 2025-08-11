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

export default function UserAccountView() {
  const { logout, user } = useStore();
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
      icon: 'solar:user-line-duotone',
      path: isCoach ? paths.user.coach : paths.user.profile,
    },
    // {
    //   title: t('subscription'),
    //   icon: 'fluent-mdl2:activate-orders',
    //   path: paths.user.subscriptions,
    // },
    {
      title: t('settings'),
      icon: 'ic:round-settings',
      path: paths.user.settings,
    },
    // {
    //   title: t('planCustomization'),
    //   icon: 'mdi:slider',
    //   path: paths.user.plan_customization,
    // },
    {
      title: t('needHelp'),
      icon: 'mdi:help',
      path: paths.faqs,
    },
  ];

  return (
    <Box sx={{ px: 0.5, pt: 5 }}>
      <List>
        {accountRoutesConfig.map((item, index) => (
          <Box key={index} onClick={() => router.push(item.path)}>
            <ListItem>
              <ListItemButton sx={{ py: 2, px: 0.5 }}>
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
