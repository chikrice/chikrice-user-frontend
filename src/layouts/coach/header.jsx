import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';

import useStore from 'src/store';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { usePathname, useRouter } from 'src/routes/hooks';

import Searchbar from './searchbar';
import BaseHeader from '../common/base-header';

const ClientsHeader = () => {
  const isSearchActive = useBoolean();
  const router = useRouter();
  const { user: coach } = useStore();

  return (
    <>
      {isSearchActive.value ? (
        <Stack width="100%">
          <Searchbar onClose={isSearchActive.onFalse} />
        </Stack>
      ) : (
        <>
          <Typography variant="h2">CHIKRICE</Typography>
          <Box display={'flex'} alignItems={'center'} gap={1}>
            <IconButton onClick={isSearchActive.onTrue}>
              <Iconify icon="eva:search-fill" width={24} />
            </IconButton>
            <Avatar
              src={coach?.picture || ''}
              alt={coach?.name}
              sx={{ width: 30, height: 30 }}
              onClick={() => router.push(paths.user.root)}
            >
              {coach?.name.charAt(0)}
            </Avatar>
          </Box>
        </>
      )}
    </>
  );
};

const DefaultHeader = () => {
  const router = useRouter();

  return (
    <IconButton onClick={router.back} sx={{ mr: 1.5 }}>
      <Iconify icon="ion:arrow-back-outline" color={'text.primary'} />
    </IconButton>
  );
};
export default function Header() {
  const pathName = usePathname();
  const isClientsPage = pathName === '/clients';

  return (
    <BaseHeader>
      <Stack flexDirection="row" alignItems={'center'} justifyContent="space-between" width="100%">
        {isClientsPage ? <ClientsHeader /> : <DefaultHeader />}
      </Stack>
    </BaseHeader>
  );
}
