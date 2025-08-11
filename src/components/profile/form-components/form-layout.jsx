import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Stack, Typography } from '@mui/material';
export default function FormLayout({ children, title, description }) {
  return (
    <Stack spacing={2}>
      <Box>
        <Typography textAlign={'center'} variant="h2">
          {title}
        </Typography>
        <Typography textAlign={'center'} color={'text.secondary'}>
          {description}
        </Typography>

        <Stack sx={{ mt: 4, mb: 6 }} spacing={2}>
          {children}
        </Stack>
      </Box>
    </Stack>
  );
}

FormLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  description: PropTypes.string,
};
