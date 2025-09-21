import { useState } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { enqueueSnackbar } from 'notistack';
import { alpha } from '@mui/material/styles';
import { ListItemIcon } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import useStore from 'src/store';
import { paths } from 'src/routes/paths';
import { useTranslate } from 'src/locales';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const logout = useStore((state) => state.logout);
  const user = useStore((state) => state.user);

  const { t } = useTranslate();
  const router = useRouter();

  const accountRoutesConfig = [
    {
      title: t('profile'),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-user"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        </svg>
      ),
      path: paths.user.profile,
    },
    {
      title: t('ingredients'),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-egg"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19 14.083c0 4.154 -2.966 6.74 -7 6.917c-4.2 0 -7 -2.763 -7 -6.917c0 -5.538 3.5 -11.09 7 -11.083c3.5 .007 7 5.545 7 11.083z" />
        </svg>
      ),
      path: paths.user.ingredients,
    },
    {
      title: t('needHelp'),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="19"
          height="19"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-info-octagon"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M12.802 2.165l5.575 2.389c.48 .206 .863 .589 1.07 1.07l2.388 5.574c.22 .512 .22 1.092 0 1.604l-2.389 5.575c-.206 .48 -.589 .863 -1.07 1.07l-5.574 2.388c-.512 .22 -1.092 .22 -1.604 0l-5.575 -2.389a2.036 2.036 0 0 1 -1.07 -1.07l-2.388 -5.574a2.036 2.036 0 0 1 0 -1.604l2.389 -5.575c.206 -.48 .589 -.863 1.07 -1.07l5.574 -2.388a2.036 2.036 0 0 1 1.604 0z" />
          <path d="M12 9h.01" />
          <path d="M11 12h1v4h1" />
        </svg>
      ),
      path: paths.faqs,
    },
  ];

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/');
      handleClose();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleMenuClick = (path) => {
    router.push(path);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.picture}
          alt={user?.name}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user?.name.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ px: 1.5, py: 1 }}>
          {accountRoutesConfig.map((option) => (
            <MenuItem key={option.title} onClick={() => handleMenuClick(option.path)}>
              <ListItemIcon style={{ minWidth: '0px' }}>{option.icon}</ListItemIcon>
              <Typography variant="body2">{option.title}</Typography>
            </MenuItem>
          ))}
        </Box>

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <Box sx={{ px: 1.5, py: 1 }}>
          <MenuItem
            disableRipple
            disableTouchRipple
            onClick={handleLogout}
            sx={{
              typography: 'body2',
              color: 'error.main',
              fontWeight: '300 !important',
              '& .MuiListItemText-root': {
                fontWeight: '300 !important',
              },
            }}
          >
            <ListItemIcon style={{ minWidth: '0px' }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-logout"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                <path d="M9 12h12l-3 -3" />
                <path d="M18 15l3 -3" />
              </svg>
            </ListItemIcon>
            <Typography variant="body2">{t('logout')}</Typography>
          </MenuItem>
        </Box>
      </Popover>
    </>
  );
}
