import socketio from 'socket.io-client';
import { config } from '../config';

const socket = socketio.connect(config.WEBSOCKET_URI);

const ACTIONS = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  PLAYLIST_ADD: 'playlist_add',
  PLAYLIST_REMOVE: 'playlist_remove'
};

export function init() {
  socket.on('connect', () => {
    socket.emit(ACTIONS.LOGIN);
  });
}

export function emit(message, callback) {
  socket.emit(message, callback);
}

export function addToPlaylist(url) {
  socket.emit(ACTIONS.PLAYLIST_ADD, url);
}
