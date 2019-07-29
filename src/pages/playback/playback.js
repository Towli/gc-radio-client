import React, { Component } from 'react';
import './playback.css';

import * as ws from '../../utils/websocket.utils';

class Playback extends Component {
  constructor(props) {
    super(props);

    this.state = { src: null };
  }
  render() {
    if (!this.state.src) {
      return (
        <div className="playback-container">
          <div className="playback" />
        </div>
      );
    }

    console.log('render: ', this.state.src);

    return (
      <div className="playback-container">
        <div className="playback">
          <iframe
            id="ytplayer"
            type="text/html"
            width="640"
            height="360"
            src={
              this.state.src +
              '?autoplay=1&controls=0&disablekb=1&enablejsapi=1&origin=http://localhost:3000'
            }
            frameBorder="0"
          />
        </div>
      </div>
    );
  }

  componentDidMount() {
    console.log('componentDidMount');
    ws.emit(ws.ACTIONS.PLAYBACK_FETCH, playback => {
      console.log('returned');
      console.log(ws.ACTIONS.PLAYBACK_FETCH, playback.src);
      this.setState({ src: playback.src });
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.src && props.src !== state.src) {
      return {
        src: props.src
      };
    }

    return null;
  }
}

export default Playback;
