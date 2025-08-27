import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { IconButton, Typography } from '@mui/material';
import Badge, { badgeClasses } from '@mui/material/Badge';

import { useTranslate } from 'src/locales';
import { usePathname, useRouter } from 'src/routes/hooks';
import { LeftIcon } from 'src/components/carousel/arrow-icons';

import BaseHeader from '../common/base-header';
import AccountPopover from '../common/account-popover';

// ----------------------------------------------------------------------

export default function Header() {
  const { t } = useTranslate();

  const pageTitles = {
    '/dashboard': t('dashboard'),
    '/progress': t('progress'),
    '/user': t('account'),
    '/user/ingredients': t('ingredients'),
    '/user/settings/': t('settings'),
    '/coach': t('coaches'),
    '/user/profile': t('profile'),
    '/user/coach-profile': t('profile'),
  };

  const router = useRouter();
  const pathName = usePathname();

  return (
    <BaseHeader>
      <Stack alignItems="center">
        <IconButton>
          <LeftIcon onClick={() => router.back()} />
        </IconButton>
      </Stack>

      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h3" sx={{ textAlign: 'center' }}>
          {pageTitles[pathName] || ''}
        </Typography>
      </Box>
      <Badge
        sx={{
          [`& .${badgeClasses.badge}`]: {
            top: 8,
            right: -16,
          },
        }}
        badgeContent={<Link href={'/'} target="_blank" rel="noopener" underline="none" sx={{ ml: 1 }}></Link>}
      >
        <AccountPopover />
      </Badge>
    </BaseHeader>
  );
}
