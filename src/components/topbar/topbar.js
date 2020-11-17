import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./topbar.css";
import { ACTIONS } from "../../constants/actions";
import BonkLogo from "../icons/bonk.logo";

class Topbar extends Component {
  render() {
    const userCount = this.props.users ? this.props.users.length : null;
    return (
      <div className="topbar">
        <div className="header">
          <div className="logo-container">
            <NavLink exact to="/live">
              <BonkLogo className="logo" />
            </NavLink>
          </div>
          <NavLink className="app-name" exact to="/live">
            bonk.fm
          </NavLink>
        </div>
        <div className="user-count">{this.humanizeUserCount(userCount)}</div>
        <div className="topbar-right">
          <button
            className="btn"
            onClick={() => {
              this.props.callback(ACTIONS.JOIN_BROADCAST);
            }}
          >
            join broadcast
          </button>
          <button
            className="btn"
            id="queue-song"
            onClick={() => {
              this.props.callback(ACTIONS.ADD_ITEM);
            }}
          >
            queue song
          </button>
        </div>
      </div>
    );
  }

  shouldComponentUpdate(nextProps) {
    console.log("should update: ", nextProps.users !== this.props.users);
    return nextProps.users !== this.props.users;
  }

  humanizeUserCount(count) {
    return `${count} listener${count === 1 ? "" : "s"}`;
  }
}

export default Topbar;
