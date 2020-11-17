import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Playback from "./pages/playback/playback";
import Queue from "./pages/queue/queue";
import History from "./pages/history/history";
import Topbar from "./components/topbar/topbar";
import Sidebar from "./components/sidebar/sidebar";
import "./app.css";

import * as ws from "./utils/websocket.utils";
import SearchModal from "./components/modal/search.modal";
import AuthModal from "./components/modal/auth.modal";
import { ACTIONS } from "./constants/actions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: { src: null, currentTime: null, happenedAt: null },
      queue: [],
      history: [],
      users: [],
      showSongSelectionModal: false,
      showAuthModal: false,
      isPlaybackFloating: false,
      hasUserJoinedBroadcast: false
    };
  }
  render() {
    return (
      <div id="app-container">
        <Topbar users={this.state.users} callback={this.handleTopbarAction} />
        <div id="column-1">
          <Sidebar />
        </div>
        <div id="column-2">
          <div className="main-container">
            <div
              className={this.state.isPlaybackFloating && "floating-container"}
            >
              {this.state.hasUserJoinedBroadcast && <Playback
                src={this.state.video.src}
                currentTime={this.state.video.currentTime}
                happenedAt={this.state.video.happenedAt}
                hasUserJoinedBroadcast={this.state.hasUserJoinedBroadcast}
              />}
            </div>
            <Redirect from="/" to="/live" />
            <Route
              exact
              path="/live"
              render={(props) => {
                this.setState({ isPlaybackFloating: false });
              }}
            />
            <Route
              exact
              path="/social"
              render={(props) => {
                this.setState({ isPlaybackFloating: true });
                return <h3>coming soon</h3>;
              }}
            />
            <Route
              exact
              path="/history"
              render={(props) => {
                this.setState({ isPlaybackFloating: true });
                return <History items={this.state.history} />;
              }}
            />
            <Route
              exact
              path="/queue"
              render={(props) => {
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
        <AuthModal
          show={this.state.showAuthModal}
          authCallback={this.handleAuth}
          onCloseCallback={this.hideAuthModal}
        />
      </div>
    );
  }
  handleSearch = (video) => {
    ws.addToPlaylist(JSON.stringify(video));
  };

  shouldComponentUpdate(_nextProps, nextState) {
    return (
      nextState.isPlaybackFloating !== this.state.isPlaybackFloating ||
      nextState.showSongSelectionModal !== this.state.showSongSelectionModal ||
      nextState.showAuthModal !== this.state.showAuthModal ||
      nextState.queue !== this.state.queue ||
      nextState.video !== this.state.video ||
      nextState.history !== this.state.history ||
      nextState.users !== this.state.users ||
      nextState.hasUserJoinedBroadcast !== this.state.hasUserJoinedBroadcast
    );
  }

  handleTopbarAction = (event) => {
    switch (event) {
      case ACTIONS.ADD_ITEM:
        this.showSongSelectionModal();
        break;
      case ACTIONS.AUTH_USER:
        this.showAuthModal();
        break;
      case ACTIONS.JOIN_BROADCAST:
        this.joinBroadcast();
        break;
      default:
        console.log("unknown action: ", event);
    }
  };

  showSongSelectionModal = () => {
    this.setState({ showSongSelectionModal: true });
  };

  hideSongSelectionModal = () => {
    this.setState({ showSongSelectionModal: false });
  };

  showAuthModal = () => {
    this.setState({ showAuthModal: true });
  };

  hideAuthModal = () => {
    this.setState({ showAuthModal: false });
  };

  joinBroadcast = () => {
    this.setState({ hasUserJoinedBroadcast: true })
  };

  componentWillMount() {
    ws.init();

    ws.registerHandler(ws.ACTIONS.PLAYBACK_FETCH, (result) => {
      console.log("PLAYBACK_FETCH: ", result);
      this.setState({
        video: {
          src: result.currentPlayback.embedUrl,
          currentTime: result.currentTime,
          happenedAt: result.currentPlayback.happenedAt,
        },
      });
    });

    ws.registerHandler(ws.ACTIONS.PLAYBACK_STARTED, (video) => {
      console.log("PLAYBACK_STARTED: ", video);
      this.setState({
        video: {
          src: video.embedUrl,
          currentTime: video.currentTime,
          happenedAt: video.happenedAt,
        },
      });
    });

    ws.registerHandler(ws.ACTIONS.PLAYLIST_FETCH, (playlist) => {
      this.setState({
        queue: playlist,
      });
    });

    ws.registerHandler(ws.ACTIONS.PLAYBACK_ENDED, () => {
      this.setState({
        video: {
          src: null,
        },
      });
    });

    ws.registerHandler(ws.ACTIONS.HISTORY_FETCH, (history) => {
      console.log("history", history);
      this.setState({
        history: history,
      });
    });

    ws.registerHandler(ws.ACTIONS.USERS_FETCH, (users) => {
      console.log("users", users);
      this.setState({
        users: users,
      });
    });
  }
}

export default App;
