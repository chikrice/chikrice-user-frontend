import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { useLocales } from 'src/locales';
import Label from 'src/components/label';

// ----------------------------------------------------------------------

export default function ResultItem({ title, path, coverUrl, groupLabel, onClickItem }) {
  const { lang } = useLocales();

  return (
    <ListItemButton
      onClick={onClickItem}
      sx={{
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'transparent',
        borderBottomColor: (theme) => theme.palette.divider,
        '&:hover': {
          borderRadius: 1,
          borderColor: (theme) => theme.palette.primary.main,
          backgroundColor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
        },
      }}
    >
      <Avatar src={coverUrl} variant="rounded" sx={{ width: 48, height: 48, mr: 2 }} />
      <ListItemText
        primaryTypographyProps={{
          typography: 'subtitle2',
          sx: { textTransform: 'capitalize' },
        }}
        secondaryTypographyProps={{ typography: 'caption' }}
        primary={title[lang]}
        secondary={path}
      />

      {groupLabel && <Label color="info">{groupLabel}</Label>}
    </ListItemButton>
  );
}

ResultItem.propTypes = {
  groupLabel: PropTypes.string,
  onClickItem: PropTypes.func,
  path: PropTypes.string,
  title: PropTypes.object,
  coverUrl: PropTypes.string,
};
