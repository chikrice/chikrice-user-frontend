import { alpha } from '@mui/material';

export const getButtonStyles = (theme, selected) => ({
  width: 1,
  height: 80,
  borderRadius: 1,
  border: `solid 1px ${alpha(theme.palette.grey[500], 0.08)}`,
  ...(selected && {
    bgcolor: 'background.paper',
    boxShadow: `-24px 8px 24px -4px ${alpha(
      theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black,
      0.08
    )}`,
  }),
  '& .svg-color': {
    background: `linear-gradient(135deg, ${theme.palette.grey[500]} 0%, ${theme.palette.grey[600]} 100%)`,
    ...(selected && {
      background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
    }),
  },
});
