import { Box } from '@mui/material';

import { useTranslate } from 'src/locales';

// -------------------------------------

interface MacroItemProps {
  icon: string;
  label: string;
  value: string;
}
export default function MacroItem({ icon, label, value }: MacroItemProps) {
  const { t } = useTranslate();

  return (
    <Box display="flex" alignItems="center" gap={0.5} sx={{ width: 'fit-content' }}>
      {icon} {t(label)} ({`${value}g`})
    </Box>
  );
}
