import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

import NowPlayingIcon from '../icons/now.playing';
import SocialIcon from '../icons/social';
import QueueIcon from '../icons/queue';

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="gutter" />
        <div className="sidebar-container">
          <ul className="sidebar-main">
            <li>
              <NavLink exact to="/live">
                <NowPlayingIcon className="icon" />
              </NavLink>
            </li>

            <li>
              <NavLink exact to="/social">
                <SocialIcon className="icon" />
              </NavLink>
            </li>

            <li>
              <NavLink exact to="/queue">
                <QueueIcon className="icon" />
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
