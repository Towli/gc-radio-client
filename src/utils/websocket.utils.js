import socketio from 'socket.io-client';

const socket = socketio.connect('http://localhost:3001');

const ACTIONS = {
  LOGIN: 'login',
  LOGOUT: 'logout'
};

export function init() {
  socket.on('connect', () => {
    socket.emit('message', ACTIONS.LOGIN);
  });
}

export function emit(message, callback) {
  socket.emit(message, callback);
}
