import axios from 'axios';

const API_BASE_URL = 'https://api-dev-hayya-v2.hayya.qa';

export const fetchForm = async (language = 'ar') => {
  const response = await axios.get(`${API_BASE_URL}/api/v1/Form`, {
    params: { formType: 'uprofile', flowType: 'profile' },
    headers: { 'X-UserLanguage': language },
  });
  return response.data;
};

export const fetchLookupData = async (url, language = 'ar') => {
  const response = await axios.get(`${API_BASE_URL}/${url}`, {
    headers: { 'X-UserLanguage': language },
  });
  return response.data;
};
