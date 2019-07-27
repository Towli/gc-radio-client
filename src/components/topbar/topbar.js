import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './topbar.css';
import { ACTIONS } from '../../constants/actions';

class Topbar extends Component {
  render() {
    return (
      <div className="topbar">
        <div className="header">
          <NavLink className="app-name" exact to="/live">
            bonk.fm
          </NavLink>
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
