import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Iconify from 'src/components/iconify';
import { foodCategories } from 'src/sections/dashboard/data';

export default function FoodCategories({ heldCategory, onChange }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'sticky',
        top: '-32px',
        backgroundColor: theme.palette.background.default,
        zIndex: 100,
        display: 'flex',
        gap: 1,
        p: 2,
        pl: 0.6,
        overflow: 'auto',
        width: '100%',
        scrollSnapType: 'x mandatory',
        '& > *': {
          scrollSnapAlign: 'center',
        },
        '::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {foodCategories.map((item) => (
        <StyledIconButton
          key={item.title}
          isActive={heldCategory === item.title}
          onClick={() => onChange(item)}
        >
          <Iconify icon={item.icon} width={30} />
          <span
            style={{
              textAlign: 'center',
              fontSize: '13px',
              lineHeight: '16px',
              marginTop: '4px',
              whiteSpace: 'nowrap',
              textTransform: 'capitalize',
            }}
          >
            {item.title}
          </span>
        </StyledIconButton>
      ))}
    </Box>
  );
}

FoodCategories.propTypes = {
  heldCategory: PropTypes.string,
  onChange: PropTypes.func,
};

const StyledIconButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'isActive' })(
  ({ theme, isActive }) => ({
    minWidth: '70px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '20px',
    backgroundColor: isActive ? theme.palette.card.default : '',
    color: isActive ? theme.palette.primary.main : theme.palette.text.disabled,
    '&.MuiButton-root:hover': {
      backgroundColor: theme.palette.card.default,
      color: theme.palette.primary.main,
    },
  })
);
