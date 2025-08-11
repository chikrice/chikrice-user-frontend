import { Avatar, Box } from '@mui/material';

import useStore from 'src/store';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const router = useRouter();

  const { user } = useStore();

  // const handleLogout = async () => {
  //   try {
  //     await logout();
  //     popover.onClose();
  //     router.replace('/');
  //   } catch (error) {
  //     console.error(error);
  //     enqueueSnackbar('Unable to logout!', { variant: 'error' });
  //   }
  // };

  return (
    <Box onClick={() => router.push(paths.user.root)}>
      <Avatar
        src={user?.picture}
        alt={user?.fullName || ''}
        sx={{
          width: 30,
          height: 30,
          border: (theme) => `dashed 1px ${theme.palette.background.default}`,
        }}
      >
        {user?.fullName}
      </Avatar>
    </Box>
  );
}
