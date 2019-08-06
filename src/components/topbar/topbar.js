import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './topbar.css';
import { ACTIONS } from '../../constants/actions';
import BonkLogo from '../icons/bonk.logo';

class Topbar extends Component {
  render() {
    return (
      <div className="topbar">
        <div className="header">
          <div className="logo-container">
            <BonkLogo className="logo" />
          </div>
          <NavLink className="app-name" exact to="/live">
            bonk.fm
          </NavLink>
        </div>
        <div className="actions">
          <button
            className="btn"
            onClick={() => {
              this.props.callback(ACTIONS.ADD_ITEM);
            }}
          >
            add item
          </button>
        </div>
      </div>
    );
  }
}

export default Topbar;
