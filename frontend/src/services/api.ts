import axios from 'axios';

const DEFAULT_API_BASE_URL = 'https://ftfl-task.onrender.com/api';

const normalizeApiBaseUrl = (value?: string) => {
  const rawValue = value?.trim();

  if (!rawValue) {
    return DEFAULT_API_BASE_URL;
  }

  const withoutTrailingSlashes = rawValue.replace(/\/+$/, '');

  if (withoutTrailingSlashes.endsWith('/slots')) {
    return withoutTrailingSlashes.replace(/\/slots$/, '');
  }

  return withoutTrailingSlashes;
};

const API = axios.create({
  baseURL: normalizeApiBaseUrl(process.env.NEXT_PUBLIC_API_URL),
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;