import React, { Component } from 'react';
import YouTubePlayer from 'youtube-player';

import './playback.css';

import * as ws from '../../utils/websocket.utils';

class Playback extends Component {
  player = null;

  constructor(props) {
    super(props);

    this.state = { src: null, currentTime: 0 };
  }
  render() {
    if (!this.state.src) {
      return (
        <div className="playback-container">
          <div className="playback">
            <div id="ytplayer" />
          </div>
        </div>
      );
    }

    return (
      <div className="playback-container">
        <div className="playback">
          <div id="ytplayer" />
        </div>
      </div>
    );
  }

  componentDidMount() {
    ws.emit(ws.ACTIONS.PLAYBACK_FETCH);

    this.player = new YouTubePlayer('ytplayer', {
      videoId: this.getVideoId(this.state.src),
      width: 640,
      height: 360
    });

    this.player.playVideo();
    this.player.seekTo(this.state.currentTime);
  }

  static getDerivedStateFromProps(props, state) {
    if (
      (props.src && props.src !== state.src) ||
      (props.currentTime && props.currentTime !== state.currentTime)
    ) {
      return {
        src: props.src,
        currentTime: props.currentTime
      };
    }

    return null;
  }

  getVideoId(src) {
    return src && src.split('embed/')[1];
  }
}

export default Playback;
