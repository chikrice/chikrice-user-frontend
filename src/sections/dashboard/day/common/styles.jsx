// styles.js

// Card Styles
export const cardStyle = {
  p: 2,
  pb: 1,
  position: 'relative',
  backgroundColor: (theme) => theme.palette.background.paper,
  boxShadow: (theme) => theme.customShadows.card,
};

// Header Styles
export const headerStyle = {
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'space-between',
  px: 2,
  pt: 1,
  pb: 0.5,
};

// Content Styles
export const contentStyle = {
  py: 2,
  px: 2,
  display: 'flex',
  alignItems: 'center',
};

// Actions Styles
export const actionsStyle = {
  gap: 2,
  display: 'flex',
  justifyContent: 'center',
  borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
};
