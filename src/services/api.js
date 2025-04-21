import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://redblackspy.ddns.net:3001', // Adicionado o protocolo
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Permite enviar cookies ou headers Authorization
});

export const createWebSocket = (token) => {
  const wsBaseURL = 'ws://redblackspy.ddns.net:3003/ws';
  return new WebSocket(`${wsBaseURL}?token=${token}`);
};
