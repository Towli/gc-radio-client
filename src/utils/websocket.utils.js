import socketio from 'socket.io-client';
import { config } from '../config';

const socket = socketio.connect(config.WEBSOCKET_URI);

export const ACTIONS = {
  LOGIN: 'login',
  LOGOUT: 'logout',
  PLAYLIST_ADD: 'playlist_add',
  PLAYLIST_REMOVE: 'playlist_remove',
  PLAYBACK_FETCH: 'playlist_fetch',
  PLAYBACK_STARTED: 'playback_started',
  PLAYBACK_ENDED: 'playback_ended'
};

export function init() {
  socket.on('connect', () => {
    socket.emit(ACTIONS.LOGIN);
  });
}

export function registerHandler(action, callback) {
  socket.on(action, callback);
}

export function emit(message, callback) {
  socket.emit(message, callback);
}

export function addToPlaylist(url) {
  socket.emit(ACTIONS.PLAYLIST_ADD, url);
}
