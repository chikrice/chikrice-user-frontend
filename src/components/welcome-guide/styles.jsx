import { useMemo } from 'react';
import { alpha } from '@mui/material';
import { useTheme } from '@emotion/react';

export function useJoyrideStyles() {
  const theme = useTheme();
  const lightMode = theme.palette.mode === 'light';

  const joyrideStyles = useMemo(() => {
    const buttonBase = {
      color: lightMode ? theme.palette.common.white : theme.palette.grey[800],
      // backgroundColor: lightMode ? theme.palette.grey[800] : theme.palette.common.white,
      '&:hover': {
        backgroundColor: lightMode ? theme.palette.grey[700] : theme.palette.grey[400],
      },
      border: 0,
      borderRadius: theme.shape.borderRadius,
      cursor: 'pointer',
      fontSize: 16,
      lineHeight: 1,
      padding: 10,
      WebkitAppearance: 'none',
    };
    return {
      options: {
        arrowColor: theme.palette.card.default,
        backgroundColor: theme.palette.card.default,
        overlayColor: alpha('#000', 0.8),
        primaryColor: theme.palette.primary.main,
        textColor: theme.palette.text.secondary,
        width: 900,
        zIndex: 2000,
      },
      tooltip: {
        borderRadius: theme.shape.borderRadius * 2,
      },
      buttonBack: {
        ...buttonBase,
        border: `solid 1px ${alpha(theme.palette.grey[500], 0.32)}`,
        color: theme.palette.text.primary,
      },
      buttonNext: {
        ...buttonBase,
        backgroundColor: lightMode ? theme.palette.grey[800] : theme.palette.common.white,
        color: lightMode ? theme.palette.common.white : theme.palette.grey[800],
        marginRight: 5,
      },
    };
  }, [theme, lightMode]);
  return joyrideStyles;
}
