import React, { Component } from 'react';
import YouTubePlayer from 'youtube-player';

import './playback.css';

import * as ws from '../../utils/websocket.utils';

class Playback extends Component {
  player = null;

  constructor(props) {
    super(props);
  }
  render() {
    console.log('render - ', this.props);
    if (!this.props.src) {
      return (
        <div className="playback-container">
          <div className="playback blank">
            <div id="ytplayer" />
          </div>
        </div>
      );
    }

    this.startPlayback();

    return (
      <div className="playback-container">
        <div className="playback">
          <div id="ytplayer" />
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log('componentDidMount - ', 'props: ', this.props);
    ws.emit(ws.ACTIONS.PLAYBACK_FETCH);

    this.player = new YouTubePlayer('ytplayer', {
      playerVars: { autoplay: 1, controls: 1 },
      width: 640,
      height: 360
    });

    // this.startPlayback();
  }

  startPlayback() {
    if (this.player) {
      this.player.loadVideoById(
        this.getVideoId(this.props.src),
        this.props.currentTime
      );
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.src !== nextProps.src ||
      this.props.currentTime !== nextProps.currentTime
    );
  }

  getVideoId(src) {
    return src && src.split('embed/')[1];
  }
}

export default Playback;
