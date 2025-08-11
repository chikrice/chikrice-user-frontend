import { accordionClasses } from '@mui/material/Accordion';
import { typographyClasses } from '@mui/material/Typography';
import { accordionSummaryClasses } from '@mui/material/AccordionSummary';

// ----------------------------------------------------------------------

export function accordion(theme) {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          borderRadius: theme.shape.borderRadius * 2,
          [`&.${accordionClasses.expanded}`]: {
            boxShadow: 'none',
            backgroundColor: theme.palette.card.default,
          },
          [`&.${accordionClasses.disabled}`]: {
            backgroundColor: 'transparent',
          },
          '&:hover': {
            backgroundColor: theme.palette.card.default,
          },
          '&:first-of-type': {
            borderRadius: theme.shape.borderRadius * 2,
          },
          '&:before': {
            display: 'none', // Remove the default divider line
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          [`& .${accordionSummaryClasses.content}`]: {
            margin: '20px 0',
          },
          [`&.${accordionSummaryClasses.disabled}`]: {
            opacity: 1,
            color: theme.palette.action.disabled,
            [`& .${typographyClasses.root}`]: {
              color: 'inherit',
            },
          },
        },
        expandIconWrapper: {
          color: 'inherit',
        },
      },
    },
  };
}
