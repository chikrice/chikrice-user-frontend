import PropTypes from 'prop-types';
import { Alert, Box, Divider, ListItem, Stack, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';

export default function PrepTipsDosDonts({ title, alertSeverity, list }) {
  const { t } = useTranslate();
  return (
    <Stack mt={4}>
      <Typography variant="h2" textAlign={'center'} mb={2}>
        {t(title)}
      </Typography>

      <Alert severity={alertSeverity} variant="standard">
        {list.map((item, index) => (
          <Box key={index} width={'100%'}>
            <ListItem sx={{ pt: index === 0 ? 0 : 'auto' }}>{t(item)}</ListItem>
            {index !== list.length - 1 && <Divider />}
          </Box>
        ))}
      </Alert>
    </Stack>
  );
}

PrepTipsDosDonts.propTypes = {
  title: PropTypes.string.isRequired,
  alertSeverity: PropTypes.string,
  list: PropTypes.array.isRequired,
};
