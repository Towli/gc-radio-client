import React, { Component } from 'react';
import './topbar.css';
import { ACTIONS } from '../../constants/actions';

class Topbar extends Component {
  render() {
    return (
      <div className="topbar">
        <div className="header">
          <a href="#" className="app-name">
            bonk.fm
          </a>
        </div>
        <div className="actions">
          <button
            className="btn"
            onClick={() => {
              this.props.callback(ACTIONS.ADD_SONG);
            }}
          >
            add song
          </button>
        </div>
      </div>
    );
  }
}

export default Topbar;
