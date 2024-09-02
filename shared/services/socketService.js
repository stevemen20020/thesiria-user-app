import { io } from 'socket.io-client';

const URL = `${process.env.EXPO_PUBLIC_SOCKET_URL}`

export const createSocket = async () => {
  return io(URL, {});
};