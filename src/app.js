import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
      showSongSelectionModal: false,
      isPlaybackFloating: false
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
            <div
              className={this.state.isPlaybackFloating && 'floating-container'}
            >
              <Playback
                src={this.state.video.src}
                currentTime={this.state.video.currentTime}
              />
            </div>
            <Redirect from="/" to="/live" />
            <Route
              exact
              path="/live"
              render={props => {
                this.setState({ isPlaybackFloating: false });
              }}
            />
            <Route
              exact
              path="/social"
              render={props => {
                this.setState({ isPlaybackFloating: true });
                return <h1>SOCIAL</h1>;
              }}
            />
            <Route
              exact
              path="/queue"
              render={props => {
                this.setState({ isPlaybackFloating: true });
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

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[app.js, shouldComponentUpdate]', this.state, nextState);
    return (
      nextState.isPlaybackFloating !== this.state.isPlaybackFloating ||
      nextState.showSongSelectionModal !== this.state.showSongSelectionModal ||
      nextState.queue !== this.state.queue ||
      nextState.video !== this.state.video
    );
  }

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
      console.log('[playback_fetch] returned result');
      console.log(result);
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
    ws.registerHandler(ws.ACTIONS.PLAYBACK_ENDED, playlist => {
      console.log('[playback_ended]');
      this.setState({
        video: {
          src: null
        }
      });
    });
  }
}

export default App;
