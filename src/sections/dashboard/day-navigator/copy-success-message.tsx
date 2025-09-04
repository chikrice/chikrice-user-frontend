import { Alert, Button, Stack, Typography } from '@mui/material';

import { useTranslate } from 'src/locales';

// -------------------------------------

interface CopySuccessMessageProps {
  onCheckCopy: () => void;
}
const CopySuccessMessage = ({ onCheckCopy }: CopySuccessMessageProps) => {
  const { t } = useTranslate();

  return (
    <Stack sx={{ alignItems: 'center', py: 2, px: 4 }} spacing={2}>
      <Alert variant="outlined">
        <Typography variant="subtitle2">{t('copySuccess')}</Typography>
      </Alert>
      <Button variant="contained" sx={{ width: '100px' }} onClick={onCheckCopy}>
        {t('check')}
      </Button>
    </Stack>
  );
};

export default CopySuccessMessage;
