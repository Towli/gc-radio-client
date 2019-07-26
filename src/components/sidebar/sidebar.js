import React, { Component } from 'react';
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
            <a href="#">
              <li>
                <NowPlayingIcon className="icon" />
              </li>
            </a>
            <a href="#">
              <li>
                <SocialIcon className="icon" />
              </li>
            </a>
            <a href="#">
              <li>
                <QueueIcon className="icon" />
              </li>
            </a>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
