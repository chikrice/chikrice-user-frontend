import { Button, Stack, Typography, Alert, Box } from '@mui/material';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';

export default function ReloadPage() {
  const { t } = useTranslate();
  const authError = useStore((state) => state.authError);
  const roadmapError = useStore((state) => state.roadmapError);
  const planError = useStore((state) => state.planError);

  // Determine which error to show and create appropriate message
  const getErrorMessage = () => {
    if (authError) {
      return {
        title: t('authenticationError'),
        message: authError,
        severity: 'error' as const,
      };
    }
    if (roadmapError) {
      return {
        title: t('roadmapError'),
        message: roadmapError,
        severity: 'error' as const,
      };
    }
    if (planError) {
      return {
        title: t('planError'),
        message: planError,
        severity: 'error' as const,
      };
    }
    return {
      title: t('generalError'),
      message: t('dataFetchError'),
      severity: 'error' as const,
    };
  };

  const errorInfo = getErrorMessage();

  return (
    <Stack sx={{ mt: '35svh', px: 3, textAlign: 'center' }} spacing={3}>
      <Alert severity={errorInfo.severity} sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {errorInfo.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {String(errorInfo.message)}
        </Typography>
      </Alert>

      <Box>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {t('reloadPageMessage')}
        </Typography>
        <Button variant="contained" onClick={() => window.location.reload()} size="large" fullWidth>
          {t('reloadApp')}
        </Button>
      </Box>
    </Stack>
  );
}
