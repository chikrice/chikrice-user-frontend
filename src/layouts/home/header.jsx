import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Badge, { badgeClasses } from '@mui/material/Badge';

import useStore from 'src/store';
import { bgBlur } from 'src/theme/css';
import Logo from 'src/components/logo';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';
import { HEADER } from '../config-layout';
import LoginButton from '../common/login-button';
import { useNavConfig } from './config-navigation';
import HeaderShadow from '../common/header-shadow';
import AccountPopover from '../common/account-popover';
import LanguagePopover from '../common/language-popover';

// ----------------------------------------------------------------------

export default function Header() {
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  const navConfigData = useNavConfig();

  const { authenticated } = useStore();

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(offsetTop && {
            ...bgBlur({
              color: theme.palette.background.default,
            }),
            height: {
              md: HEADER.H_DESKTOP_OFFSET,
            },
          }),
        }}
      >
        <Container sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Badge
            style={{ direction: 'ltr' }}
            sx={{
              display: 'flex',
              alignItems: 'end',
              [`& .${badgeClasses.badge}`]: {
                top: 8,
                right: -16,
              },
            }}
            badgeContent={<Link href={'/'} target="_blank" rel="noopener" underline="none"></Link>}
          >
            <Logo sx={{ mb: 0.2 }} />
          </Badge>

          <Box sx={{ flexGrow: 1 }} />

          {mdUp && <NavDesktop data={navConfigData} />}

          <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }}>
            {authenticated ? <AccountPopover /> : <LoginButton />}

            {/* either login btn or account icon  */}
            <LanguagePopover sx={{ mr: { md: 2 }, ml: { xs: 1, md: 0 } }} />

            {!mdUp && <NavMobile data={navConfigData} />}
          </Stack>
        </Container>
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}
