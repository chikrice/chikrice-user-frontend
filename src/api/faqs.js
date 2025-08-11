import axios, { endpoints } from 'src/utils/axios';

export async function submitQuestion(data) {
  const URL = endpoints.faqs;
  return await axios.post(URL, data);
}
