import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import { Container, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';

import type { SxProps, Theme } from '@mui/material';

// -------------------------------------

interface EmptyContentProps {
  title?: string;
  imgUrl?: string;
  action?: React.ReactNode;
  filled?: boolean;
  description?: string;
  sx?: SxProps<Theme>;
  [key: string]: unknown;
}
export default function EmptyContent({
  sx,
  title,
  imgUrl,
  action,
  filled,
  description,
  ...other
}: EmptyContentProps) {
  return (
    <Container>
      <Stack
        flexGrow={1}
        alignItems="center"
        justifyContent="center"
        sx={{
          px: 3,
          height: 1,
          ...(filled && {
            borderRadius: 2,
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
            border: (theme) => `dashed 1px ${alpha(theme.palette.grey[500], 0.08)}`,
          }),
          ...sx,
        }}
        {...other}
      >
        <Box
          component="img"
          alt="empty content"
          src={imgUrl || '/assets/icons/empty/ic_content.svg'}
          sx={{ width: 1, maxWidth: 160 }}
        />

        {title && (
          <Typography
            variant="h6"
            component="span"
            sx={{ mt: 1, color: 'text.disabled', textAlign: 'center' }}
          >
            {title}
          </Typography>
        )}

        {description && (
          <Typography variant="caption" sx={{ mt: 1, color: 'text.disabled', textAlign: 'center' }}>
            {description}
          </Typography>
        )}

        {action && action}
      </Stack>
    </Container>
  );
}
