import {useState} from 'react';
import SocketInstance from '../services/helpingMethods/socketInstance';

const useSocket = setter => {
  const [socket, setsocket] = useState(SocketInstance.getInstance());
  if (setter) return [socket, setsocket];
  return socket;
};

export default useSocket;
