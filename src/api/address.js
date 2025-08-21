import { api, endpoints } from 'src/utils/axios';

export async function createAddress(data) {
  console.log(data);

  return await api.post(endpoints.address.create, data);
}
export async function updateAddress(id, data) {
  return await api.patch(endpoints.address.update(id), data);
}
export async function deleteAddress(id, userId) {
  return await api.delete(endpoints.address.delete(id) + '?userId=' + userId);
}

export async function getFullAddressFromlatLong(latitude, longitude) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
  const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try {
    const response = await api.get(geocodeUrl);
    const { data } = response;

    if (data.status === 'OK') {
      const fullAddress = data.results[0]?.formatted_address || 'Address not found';
      return fullAddress;
    } else {
      console.error('Geocoding error:', data.status);
      return 'Unable to fetch address';
    }
  } catch (error) {
    console.error('Error fetching address:', error);
    return 'Error occurred while fetching address';
  }
}
