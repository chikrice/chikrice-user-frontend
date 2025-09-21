import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { IconButton } from '@mui/material';
import Badge, { badgeClasses } from '@mui/material/Badge';

import { useRouter } from 'src/routes/hooks';
import { LeftIcon } from 'src/components/carousel/arrow-icons';

import BaseHeader from '../common/base-header';
import AccountPopover from '../common/account-popover';
import SettingsButton from '../common/settings-button';

// ----------------------------------------------------------------------

export default function Header() {
  const router = useRouter();

  return (
    <BaseHeader>
      <Stack width={'100%'} alignItems="center" flexDirection={'row'} justifyContent={'space-between'}>
        <IconButton onClick={() => router.back()}>
          <LeftIcon />
        </IconButton>

        <Stack flexDirection={'row'} gap={1}>
          <SettingsButton />
          <Badge
            sx={{
              [`& .${badgeClasses.badge}`]: {
                top: 8,
                right: -16,
              },
            }}
            badgeContent={
              <Link href={'/'} target="_blank" rel="noopener" underline="none" sx={{ ml: 1 }}></Link>
            }
          >
            <AccountPopover />
          </Badge>
        </Stack>
      </Stack>
    </BaseHeader>
  );
}
