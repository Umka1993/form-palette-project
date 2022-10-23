import axios from 'axios';

const defaultConfig = {
  baseURL: 'https://test-job.pixli.app/',
  headers: {
    'Content-Type': 'multipart/formTab-data'
  }
};

export const api = axios.create(defaultConfig);
