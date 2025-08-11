import { Box } from '@mui/material';
import styled from '@emotion/styled';

export const StyledWrapper = styled(Box)(({ theme }) => ({
  left: 0,
  bottom: 65,
  width: '100%',
  position: 'absolute',
  boxShadow: theme.customShadows.bottomNav,
  backgroundColor: theme.palette.background.default,
}));

export const StyledNavigator = styled(Box)(() => ({
  height: 45,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '5px 20px',
}));
