import axios from 'axios';

import { toCamel, toSnake } from '@/utils';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

api.interceptors.request.use(config => {
  if (config.params) {
    config.params = toSnake(config.params);
  }

  if (config.data) {
    config.data = toSnake(config.data);
  }

  return config;
});

api.interceptors.response.use(
  response => {
    if (response.data) {
      response.data = toCamel(response.data);
    }
    return response;
  },
  error => {
    if (error.response?.data) {
      error.response.data = toCamel(error.response.data);
    }
    return Promise.reject(error);
  },
);
