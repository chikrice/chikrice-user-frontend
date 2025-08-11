//import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import { Box, Button, Stack } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

export default function MealOrderActions() {
  const router = useRouter();

  return (
    <StyledMealOrderFooter>
      <ActionsWrapper>
        <Button size="large" variant="outlined" sx={{ minWidth: 100 }}>
          Order
        </Button>
        <Button
          size="large"
          variant="contained"
          fullWidth
          onClick={() => router.push(`${paths.subscriptions.root}?custom`)}
        >
          checkout plans
        </Button>
      </ActionsWrapper>
    </StyledMealOrderFooter>
  );
}

//MealOrderActions.propTypes = {}

const StyledMealOrderFooter = styled(Stack)(() => ({
  width: '100%',
  position: 'fixed',
  left: 0,
  bottom: 20,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ActionsWrapper = styled(Box)(({ theme }) => ({
  width: '95%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  gap: '1rem',
  padding: '1.5rem',
  backgroundColor: theme.palette.card.default,
  borderRadius: 35,
  boxShadow: theme.customShadows.z8,
}));
