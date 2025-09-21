import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import Logo from 'src/components/logo';
import { usePathname, useRouter } from 'src/routes/hooks';

import { useNavConfig } from './config-navigation';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

export default function Sidebar() {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const navConfig = useNavConfig();

  const handleNavItemClick = (path) => {
    router.push(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: `1px solid ${theme.palette.divider}`,
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      <Box sx={{ overflow: 'auto', height: '100%' }}>
        {/* Logo Section */}
        <Box
          sx={{
            mb: 3,
            mx: 2.5,
            py: 2,
            px: 2.5,
            borderRadius: 1.5,
            alignItems: 'center',
          }}
        >
          <Logo />
        </Box>

        {/* Navigation Items */}
        <List>
          {navConfig.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                selected={pathname === item.path}
                onClick={() => handleNavItemClick(item.path)}
                sx={{
                  mx: 2.5,
                  my: 0.2,
                  borderRadius: 1,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.action.selected,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
