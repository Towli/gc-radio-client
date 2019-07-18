import React, { Component } from 'react';
import Search from './components/search';
import Playback from './components/playback';
import Sidebar from './components/sidebar/sidebar';
import './app.css';

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
      <div id="app-container">
        <div id="column-1">
          <Sidebar />
        </div>
        <div id="column-2">
          <div className="main-container">
            <div className="header">
              <div className="actions">
                <button class="btn">add song</button>
              </div>
            </div>
            {/* <Search callback={this.handleSearch} /> */}
            <div className="playback-container">
              <Playback src={src} />
            </div>
          </div>
        </div>
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
