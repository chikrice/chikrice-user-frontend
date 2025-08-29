import { useCallback } from 'react';
import { useSnackbar } from 'notistack';

import useStore from 'src/store';
import { useTranslate } from 'src/locales';
import { api, endpoints } from 'src/utils/axios';

const useAddressBook = () => {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();
  const { user, refreshUserInfo } = useStore();

  const handleUpdateUser = useCallback(
    async (data) => {
      try {
        await api.put(endpoints.user.update(user?._id), data);
        enqueueSnackbar(t('updateSuccess'));
      } catch (error) {
        console.error(error);
        enqueueSnackbar(t('somethingWentWrong'), {
          variant: 'error',
        });
      } finally {
        refreshUserInfo(user?._id);
      }
    },
    [user?._id, enqueueSnackbar, refreshUserInfo, t]
  );

  const handleAddAddressToAddressBook = useCallback(
    (address) => {
      const newAddressBook = user.addressBook.map((a) => (address.primary ? { ...a, primary: false } : a));

      const addressBook = [...newAddressBook, address];
      handleUpdateUser({ addressBook });
    },
    [user?.addressBook, handleUpdateUser]
  );

  const handleDeleteAddress = useCallback(
    (index) => {
      const addressBook = user?.addressBook.filter((_, i) => i !== index);
      handleUpdateUser({ addressBook });
    },
    [user?.addressBook, handleUpdateUser]
  );

  return { handleAddAddressToAddressBook, handleDeleteAddress, handleUpdateUser };
};

export default useAddressBook;
