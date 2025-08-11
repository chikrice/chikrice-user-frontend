import PropTypes from 'prop-types';

import { useTranslate } from 'src/locales';

export default function EditFooterContent({ macros }) {
  const { t } = useTranslate();
  return (
    <>
      <small>
        {t('carb')} {macros?.carb?.toFixed(1)}g
      </small>
      <small>
        {t('pro')} {macros?.pro?.toFixed(1)}g
      </small>
      <small>
        {t('fat')} {macros?.fat?.toFixed(1)}g
      </small>
    </>
  );
}

EditFooterContent.propTypes = {
  macros: PropTypes.object,
};
