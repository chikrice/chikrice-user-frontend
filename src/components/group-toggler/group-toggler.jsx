import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

export default function CustomGroupToggler({
  activeGroup,
  onToggle,
  groupOneValue,
  groupTwoValue,
  ...other
}) {
  const { t } = useTranslate();

  return (
    <StyledGroupToggler {...other}>
      <StyledGroupButton
        isActive={activeGroup === groupOneValue}
        onClick={() => onToggle(groupOneValue)}
      >
        {t(groupOneValue)}
      </StyledGroupButton>
      <StyledGroupButton
        isActive={activeGroup === groupTwoValue}
        onClick={() => onToggle(groupTwoValue)}
      >
        {t(groupTwoValue)}
      </StyledGroupButton>
    </StyledGroupToggler>
  );
}

CustomGroupToggler.propTypes = {
  onToggle: PropTypes.func,
  activeGroup: PropTypes.string,
  groupOneValue: PropTypes.string,
  groupTwoValue: PropTypes.string,
  other: PropTypes.any,
};

export const StyledGroupToggler = styled(Card)(() => ({
  borderRadius: 30,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  paddingTop: '5px',
  paddingBottom: '5px',
}));

// Styling the Button component
export const StyledGroupButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})(({ theme, isActive }) => ({
  borderRadius: 30,
  backgroundColor: isActive ? theme.palette.background.default : '',
  color: isActive ? theme.palette.primary.main : '',
  width: '45%',
  height: 45,
  '&:hover': {
    backgroundColor: isActive ? theme.palette.background.default : '',
  },
}));
