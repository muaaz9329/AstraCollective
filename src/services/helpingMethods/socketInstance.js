import io from 'socket.io-client';
import {BASE_URL, BASE_URL_SOCKET} from '../../network/routes';
let socket = null;

class SocketInstance {
  static getInstance = () => {
    if (socket == null) {
      socket = io(BASE_URL_SOCKET);
    }
    return socket;
  };

  static clear = user => {
    socket.emit('user-leave', {userId: user});
    socket.disconnect();
    socket = null;
  };
}

export default SocketInstance;
