import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.0.200:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});
