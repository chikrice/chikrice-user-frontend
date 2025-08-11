import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { usePathname, useRouter } from 'src/routes/hooks';

import { useNavConfig } from '../../config-navigation';

export default function MobileBottomNavigation() {
  const router = useRouter();
  const pathName = usePathname();

  const [value, setValue] = useState(0);

  const navConfig = useNavConfig();

  const theme = useTheme();

  useEffect(() => {
    const index = navConfig.findIndex((item) => item.path === pathName);
    setValue(index);
  }, [pathName, navConfig, setValue]);

  return (
    <Box sx={{ width: '100%' }}>
      <BottomNavigation
        showLabels
        sx={{
          py: 1,
          height: 65,
          backgroundColor: theme.palette.background.default,
          borderTop: `solid 1px ${theme.palette.nav.soft}`,
        }}
        value={value}
      >
        {navConfig.map((item, index) => (
          <BottomNavigationAction
            key={index}
            label={item.title}
            icon={item.icon}
            onClick={() => router.push(item.path)}
            sx={{
              height: 50,
              '& svg': {
                width: 55,
                height: 30,
                borderRadius: 12,
                py: '3px',
              },
              '&.Mui-selected svg': {
                py: '2px',
                backgroundColor: theme.palette.card.soft,
              },
              '&.Mui-selected': {
                color: theme.palette.text.main,
              },
            }}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
}
