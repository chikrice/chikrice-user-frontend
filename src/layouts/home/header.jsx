import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import { IconButton } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Badge, { badgeClasses } from '@mui/material/Badge';

import useStore from 'src/store';
import { bgBlur } from 'src/theme/css';
import Image from 'src/components/image';
import logoDark from 'src/assets/images/logo-dark.png';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';
import logoLight from 'src/assets/images/logo-light.png';
import { useSettingsContext } from 'src/components/settings';

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
  const settings = useSettingsContext();

  const mdUp = useResponsive('up', 'md');

  const offsetTop = useOffSetTop(HEADER.H_DESKTOP);

  const navConfigData = useNavConfig();

  const authenticated = useStore((state) => state.authenticated);

  const handleToggleTheme = () => {
    settings.onUpdate('themeMode', settings.themeMode === 'light' ? 'dark' : 'light');
  };

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
            <Image
              src={settings.themeMode === 'light' ? logoLight : logoDark}
              alt="logo"
              width={100}
              sx={{ scale: 1.5 }}
            />
          </Badge>

          <Box sx={{ flexGrow: 1 }} />

          {mdUp && <NavDesktop data={navConfigData} />}

          <Stack alignItems="center" direction={{ xs: 'row', md: 'row-reverse' }}>
            {authenticated ? <AccountPopover /> : <LoginButton />}

            <IconButton
              onClick={handleToggleTheme}
              sx={{
                mr: { md: 2 },
                ml: 1,
                transition: theme.transitions.create(['transform'], {
                  duration: theme.transitions.duration.standard,
                }),
                '&:hover': {
                  transform: settings.themeMode === 'light' ? 'rotate(25deg)' : 'rotate(180deg)',
                },
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                color={theme.palette.text.primary}
                style={{
                  transition: theme.transitions.create(['opacity', 'transform'], {
                    duration: theme.transitions.duration.standard,
                  }),
                }}
              >
                {settings.themeMode === 'light' ? (
                  // Moon icon (current)
                  <>
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z" />
                  </>
                ) : (
                  // Sun icon
                  <>
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 19a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" />
                    <path d="M18.313 16.91l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.218 -1.567l.102 .07z" />
                    <path d="M7.007 16.993a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" />
                    <path d="M4 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
                    <path d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
                    <path d="M6.213 4.81l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.217 -1.567l.102 .07z" />
                    <path d="M19.107 4.893a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" />
                    <path d="M12 2a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" />
                    <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                  </>
                )}
              </svg>
            </IconButton>

            {/* either login btn or account icon  */}
            <LanguagePopover />

            {!mdUp && <NavMobile data={navConfigData} />}
          </Stack>
        </Container>
      </Toolbar>

      {offsetTop && <HeaderShadow />}
    </AppBar>
  );
}
