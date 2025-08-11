import styled from '@emotion/styled';
import { Button } from '@mui/material';

const StyledCancelButton = styled(Button)(() => ({
  position: 'absolute',
  top: '12px',
  right: '16px',
  direction: 'ltr',
  zIndex: 2000,
}));

export default StyledCancelButton;
