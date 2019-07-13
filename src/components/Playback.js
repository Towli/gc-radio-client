import React, { Component } from 'react';
import './Playback.css';

// import { config } from '../config';

class Playback extends Component {
  constructor(props) {
    super(props);

    this.state = { src: null };
  }
  render() {
    if (!this.state.src) {
      return null;
    }

    return (
      <div className="playback-container">
        <iframe
          id="ytplayer"
          type="text/html"
          width="640"
          height="360"
          src={this.state.src + '?autoplay=1&controls=0&disablekb=1&enablejsapi=1&origin=http://localhost:3000'}
          frameBorder="0"
        />
      </div>
    );
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
