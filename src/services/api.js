import axios from 'axios';

const API_BASE_URL = 'https://api-dev-hayya-v2.hayya.qa';
const API_BASE_URL2 = 'https://localhost:7205';

export const fetchForm = async () => {
  const response = await axios.get(`${API_BASE_URL}/api/Form`, {
    params: { formType: 'uprofile', flowType: 'profile' },
    headers: { 'X-UserLanguage': 'ar' },
  });
  return response.data;
};

export const fetchLookupData = async (url) => {
  const response = await axios.get(`${API_BASE_URL}/`+url, {
    headers: { 'X-UserLanguage': 'ar' },
  });

  return response.data;
};
