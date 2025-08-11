import PropTypes from 'prop-types';
import { Button, Stack } from '@mui/material';

import { useTranslate } from 'src/locales';

export const DeliverActions = ({ address, onDelete, onDeliver }) => {
  const { t } = useTranslate();

  return (
    <Stack flexDirection="row" flexWrap="wrap" flexShrink={0}>
      {!address.primary && (
        <Button size="small" color="error" sx={{ mr: 1 }} onClick={() => onDelete(address)}>
          {t('delete')}
        </Button>
      )}
      <Button variant="outlined" size="small" onClick={() => onDeliver(address)}>
        {t('deliverToThisAddress')}
      </Button>
    </Stack>
  );
};

export const ManageActions = ({ address, onEdit, onDelete }) => {
  const { t } = useTranslate();

  return (
    <Stack flexDirection="row" justifyContent={'right'} flexWrap="wrap" flexShrink={0}>
      <Button size="small" color="info" sx={{ mr: 1 }} onClick={() => onEdit(address)}>
        {t('edit')}
      </Button>
      <Button size="small" color="error" sx={{ mr: 1 }} onClick={() => onDelete(address)}>
        {t('delete')}
      </Button>
    </Stack>
  );
};

DeliverActions.propTypes = {
  address: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onDeliver: PropTypes.func.isRequired,
};

ManageActions.propTypes = {
  address: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
