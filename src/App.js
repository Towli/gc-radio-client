import React, { Component } from 'react';
import Search from './components/Search';
import Playback from './components/Playback';
import logo from './logo.svg';
import './App.css';

import * as ws from './utils/websocket.utils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null
    };
  }
  render() {
    const src = this.state.src;
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>GC RADIO</h2>
        </div>
        <Search callback={this.handleSearch} />
        <Playback src={src} />
      </div>
    );
  }
  handleSearch = url => {
    this.setState({ src: url });
    ws.addToPlaylist(url);
  };
  componentWillMount() {
    ws.init();
  }
}

export default App;
