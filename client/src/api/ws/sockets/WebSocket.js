import CONSTANTS from '../../../constants';
import socketIoClient from 'socket.io-client';

class WebSocket {
  constructor(dispatch, getState, room) {
    this.dispatch = dispatch;
    this.getState = getState;
    this.connect(room);
    this.listen();
  }

  connect = (room) => {
    this.socket = socketIoClient(`${CONSTANTS.WS_BASE_URL}${room}`, {
      origins: 'localhost:*',
    });
  };

  listen = () => {
    this.socket.on('connect', () => {
      this.anotherSubscribes();
    });
  };

  anotherSubscribes = () => {
  };
}

export default WebSocket;
