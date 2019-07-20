import React, { Component } from 'react';
import Playback from './components/playback';
import Sidebar from './components/sidebar/sidebar';
import './app.css';

import * as ws from './utils/websocket.utils';
import ModalBox from './components/modal/modal.box';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: null,
      showSongSelectionModal: false
    };
  }
  render() {
    return (
      <div id="app-container">
        <div id="column-1">
          <Sidebar />
        </div>
        <div id="column-2">
          <div className="main-container">
            <div className="header">
              <div className="actions">
                <button className="btn" onClick={this.showSongSelectionModal}>
                  add song
                </button>
              </div>
            </div>
            <div className="playback-container">
              <Playback src={this.state.src} />
            </div>
          </div>
        </div>
        <ModalBox
          show={this.state.showSongSelectionModal}
          searchCallback={this.handleSearch}
          onCloseCallback={this.hideSongSelectionModal}
        />
      </div>
    );
  }
  handleSearch = url => {
    this.setState({ src: url });
    ws.addToPlaylist(url);
  };

  showSongSelectionModal = () => {
    this.setState({ showSongSelectionModal: true });
  };

  hideSongSelectionModal = () => {
    this.setState({ showSongSelectionModal: false });
  };

  componentWillMount() {
    ws.init();
  }
}

export default App;
