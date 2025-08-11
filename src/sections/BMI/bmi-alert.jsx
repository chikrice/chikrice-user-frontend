import PropTypes from 'prop-types';
import Alert from '@mui/material/Alert';

import Label from 'src/components/label';
import { useTranslate } from 'src/locales';

export default function BMIAlert({
  bmi,
  alertDetails,
  userCurrentWeight,
  userCurrentHeight,
  minNormalWeight,
  maxNormalWeight,
}) {
  const { t } = useTranslate();

  return (
    <Alert sx={{ mt: 1 }} severity={alertDetails.color} variant="outlined">
      {t('theBMIFor')}({userCurrentWeight}kg) {t('and')} {t('yourHeight')} ({userCurrentHeight}cm),{' '}
      {t('is')} {bmi.toFixed(1)} , {t('wihchIsInThe')}
      <Label sx={{ mx: 1 }} color={alertDetails.color}>
        {t(alertDetails.label)}
      </Label>
      <p>
        {t('normalRangeForYou')} {minNormalWeight} kg {t('to')} {maxNormalWeight} kg.
      </p>
    </Alert>
  );
}

BMIAlert.propTypes = {
  bmi: PropTypes.number,
  alertDetails: PropTypes.object,
  minNormalWeight: PropTypes.string,
  maxNormalWeight: PropTypes.string,
  userCurrentWeight: PropTypes.number,
  userCurrentHeight: PropTypes.number,
};
