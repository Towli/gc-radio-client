import React, { Component } from "react";
import YouTubePlayer from "youtube-player";

import "./playback.css";

import * as ws from "../../utils/websocket.utils";

class Playback extends Component {
  player = null;

  render() {
    console.log("render - ", this.props);

    const blankContainer = (
      <div className="playback-container">
        <div className="playback blank">
          <div id="ytplayer" />
        </div>
      </div>
    );

    let playbackContainer = (
      <div className="playback-container">
        <div className="playback">
          <div id="ytplayer" />
        </div>
      </div>
    );

    if (!this.props.src) {
      this.player && this.player.stopVideo();
      return blankContainer;
    }

    this.startPlayback();

    return playbackContainer;
  }

  componentDidMount() {
    console.log("componentDidMount - ", "props: ", this.props);
    ws.emit(ws.ACTIONS.PLAYBACK_FETCH);

    this.player = new YouTubePlayer("ytplayer", {
      playerVars: { autoplay: 1, controls: 1 },
      width: 640,
      height: 360,
    });
  }

  startPlayback() {
    if (this.player) {
      console.log("starting playing: ", this.props.src, this.props.currentTime);
      this.player.loadVideoById(
        this.getVideoId(this.props.src),
        this.props.currentTime
      );
    }
  }

  shouldComponentUpdate(nextProps, _nextState) {
    return (
      this.props.src !== nextProps.src ||
      this.props.currentTime !== nextProps.currentTime ||
      this.props.happenedAt !== nextProps.happenedAt
    );
  }

  getVideoId(src) {
    return src && src.split("embed/")[1];
  }
}

export default Playback;
