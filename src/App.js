import React, { Component } from 'react';
import Playback from './components/playback';
import Topbar from './components/topbar/topbar';
import Sidebar from './components/sidebar/sidebar';
import './app.css';

import * as ws from './utils/websocket.utils';
import SearchModal from './components/modal/search.modal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: { src: null, duration: null },
      showSongSelectionModal: false
    };
  }
  render() {
    return (
      <div id="app-container">
        <Topbar />
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
              <Playback src={this.state.video.src} />
            </div>
          </div>
        </div>
        <SearchModal
          show={this.state.showSongSelectionModal}
          searchCallback={this.handleSearch}
          onCloseCallback={this.hideSongSelectionModal}
        />
      </div>
    );
  }
  handleSearch = video => {
    console.log('[handleSearch]: ', video);
    // this.setState({ video: video });
    ws.addToPlaylist(video);
  };

  showSongSelectionModal = () => {
    this.setState({ showSongSelectionModal: true });
  };

  hideSongSelectionModal = () => {
    this.setState({ showSongSelectionModal: false });
  };

  componentWillMount() {
    ws.init();
    ws.registerHandler(ws.ACTIONS.PLAYBACK_STARTED, video => {
      this.setState({
        video: {
          src: video.embedUrl,
          duration: video.duration
        }
      });
    });
  }
}

export default App;
