import { api, endpoints } from 'src/utils/axios';

export async function submitQuestion(data) {
  const URL = endpoints.faqs;
  return await api.post(URL, data);
}
