import { mutate } from 'swr';
import PropTypes from 'prop-types';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import { endpoints } from 'src/utils/axios';
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { deleteAddress, getFullAddressFromlatLong } from 'src/api/address';

import AddressItem from '../address-item';
import AddressEditForm from '../address-edit-form';
import AddressMap from '../address-location-finder';
import StyledCancelButton from '../components/cancel-button';
import { DeliverActions, ManageActions } from '../components/address-actions';

//-------------------------------------------------------------

const initialState = {
  _id: null,
  name: '',
  notes: '',
  latitude: 0,
  longitude: 0,
  addressLink: '',
  isPrimary: true,
  fullAddress: '',
  addressType: 'home',
};

//-------------------------------------------------------------
export default function Address({ actionType = 'manage', onDeliverToAddress }) {
  const { t } = useTranslate();

  const { user } = useStore((state) => state);

  const [heldAddress, setHeldAddress] = useState(initialState);

  const [isAddressMap, setIsAddressMap] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);

  const handleNewAddress = useCallback(() => {
    setHeldAddress(initialState);
    setIsAddressMap(true);
  }, [setHeldAddress]);

  const handleEditAddress = useCallback((address) => {
    setHeldAddress(address);

    setIsEditAddress(true);
  }, []);

  const handleDeleteAddress = useCallback(
    async (address) => {
      await deleteAddress(address._id, user.id);
      await mutate(endpoints.user.get(user.id));
      enqueueSnackbar(t('deleteSuccess'));
    },
    [user.id, t]
  );

  const handleCancel = useCallback(() => {
    if (isAddressMap) {
      setIsAddressMap(false);
    } else {
      setIsEditAddress(false);
    }
  }, [isAddressMap]);

  const handleLocationConfirm = useCallback(
    async (location) => {
      setIsAddressMap(false);
      setIsEditAddress(true);

      const { latitude, longitude } = location;
      const addressLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      const fullAddress = await getFullAddressFromlatLong(latitude, longitude);

      setHeldAddress((prevState) => ({
        ...prevState,
        latitude,
        longitude,
        addressLink,
        fullAddress,
      }));
    },
    [setHeldAddress, setIsAddressMap, setIsEditAddress]
  );

  const renderDeliverActions = (address) => (
    <DeliverActions address={address} onDelete={handleDeleteAddress} onDeliver={onDeliverToAddress} />
  );

  const renderManageActions = (address) => (
    <ManageActions address={address} onEdit={handleEditAddress} onDelete={handleDeleteAddress} />
  );

  return (
    <>
      {!isAddressMap && (
        <Stack mt={3}>
          <Typography variant="h6" mb={1} mx={1}>
            {t('addressBook')}
          </Typography>
          {user?.addressBook.length ? (
            user.addressBook.map((address, index) => (
              <AddressItem
                key={index}
                address={address}
                action={
                  actionType === 'manage' ? renderManageActions(address) : renderDeliverActions(address)
                }
                sx={{
                  p: 3,
                  mb: 3,
                  borderRadius: 2,
                  boxShadow: (theme) => theme.customShadows.card,
                }}
              />
            ))
          ) : (
            <EmptyContent title={t('noAddress')} />
          )}

          <Stack direction="row" justifyContent="right" mt={2}>
            <Button
              size="small"
              color="primary"
              onClick={handleNewAddress}
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              {t('newAddress')}
            </Button>
          </Stack>
        </Stack>
      )}

      {isAddressMap && (
        <AddressMap onConfirm={handleLocationConfirm} onCancel={() => setIsAddressMap(false)} />
      )}

      {isEditAddress && (
        <AddressEditForm
          userId={user.id}
          address={heldAddress}
          onConfirm={() => setIsEditAddress(false)}
          onEditLocation={handleNewAddress}
        />
      )}

      {(isAddressMap || isEditAddress) && (
        <StyledCancelButton
          variant="outlined"
          onClick={handleCancel}
          endIcon={<Iconify icon="iconoir:cancel" />}
        >
          {t('cancel')}
        </StyledCancelButton>
      )}
    </>
  );
}

Address.propTypes = {
  actionType: PropTypes.string,
  onDeliverToAddress: PropTypes.func,
};
