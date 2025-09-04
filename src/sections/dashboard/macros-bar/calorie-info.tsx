import { Box } from '@mui/material';

import Label from 'src/components/label';
import { useTranslate } from 'src/locales';

import { calorieInfoStyles } from './styles';

// -------------------------------------
interface CalorieInfoProps {
  label: string;
  value?: number | string;
}
export default function CalorieInfo({ label, value }: CalorieInfoProps) {
  const { t } = useTranslate();

  return (
    <Box sx={calorieInfoStyles}>
      <span>{t(label)}</span>

      <Label color="info" variant="ghost">
        {value}
      </Label>
    </Box>
  );
}
