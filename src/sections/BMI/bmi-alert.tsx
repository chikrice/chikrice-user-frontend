import Alert from '@mui/material/Alert';

import Label from 'src/components/label';
import { useTranslate } from 'src/locales';

import type { AlertColor } from '@mui/material/Alert';

// -------------------------------------

interface BMIAlertProps {
  bmi: number;
  alertDetails: { color: AlertColor; label: string };
  userCurrentWeight: number;
  userCurrentHeight: number;
  minNormalWeight: string;
  maxNormalWeight: string;
}

export default function BMIAlert({
  bmi,
  alertDetails,
  userCurrentWeight,
  userCurrentHeight,
  minNormalWeight,
  maxNormalWeight,
}: BMIAlertProps) {
  const { t } = useTranslate();

  return (
    <Alert sx={{ mt: 1 }} severity={alertDetails.color} variant="outlined">
      {t('theBMIFor')}({userCurrentWeight}kg) {t('and')} {t('yourHeight')} ({userCurrentHeight}cm), {t('is')}{' '}
      {bmi.toFixed(1)} , {t('wihchIsInThe')}
      <Label sx={{ mx: 1 }} color={alertDetails.color}>
        {t(alertDetails.label)}
      </Label>
      <p>
        {t('normalRangeForYou')} {minNormalWeight} kg {t('to')} {maxNormalWeight} kg.
      </p>
    </Alert>
  );
}
