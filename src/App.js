import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Playback from './pages/playback/playback';
import Queue from './pages/queue/queue';
import Topbar from './components/topbar/topbar';
import Sidebar from './components/sidebar/sidebar';
import './app.css';

import * as ws from './utils/websocket.utils';
import SearchModal from './components/modal/search.modal';
import { ACTIONS } from './constants/actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: { src: null, currentTime: null },
      queue: [],
      showSongSelectionModal: false
    };
  }
  render() {
    return (
      <div id="app-container">
        <Topbar callback={this.handleTopbarAction} />
        <div id="column-1">
          <Sidebar />
        </div>
        <div id="column-2">
          <div className="main-container">
            <Route
              exact
              path="/live"
              render={props => {
                return (
                  <Playback
                    src={this.state.video.src}
                    currentTime={this.state.video.currentTime}
                  />
                );
              }}
            />
            <Route
              exact
              path="/social"
              render={props => {
                return <h1>SOCIAL</h1>;
              }}
            />
            <Route
              exact
              path="/queue"
              render={props => {
                return <Queue items={this.state.queue} />;
              }}
            />
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
    ws.addToPlaylist(video);
  };

  handleTopbarAction = event => {
    if (event === ACTIONS.ADD_ITEM) {
      this.showSongSelectionModal();
    }
  };

  showSongSelectionModal = () => {
    this.setState({ showSongSelectionModal: true });
  };

  hideSongSelectionModal = () => {
    this.setState({ showSongSelectionModal: false });
  };

  componentWillMount() {
    ws.init();
    ws.registerHandler(ws.ACTIONS.PLAYBACK_FETCH, result => {
      this.setState({
        video: {
          src: result.currentPlayback.embedUrl,
          currentTime: result.currentTime
        }
      });
    });
    ws.registerHandler(ws.ACTIONS.PLAYBACK_STARTED, video => {
      this.setState({
        video: {
          src: video.embedUrl
        }
      });
    });
    ws.registerHandler(ws.ACTIONS.PLAYLIST_FETCH, playlist => {
      this.setState({
        queue: playlist
      });
    });
  }
}

export default App;
