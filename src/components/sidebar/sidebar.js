import React, { Component } from 'react';
import './sidebar.css';

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <div className="header">
          <a href="#">bonk.fm</a>
        </div>
        <div className="sidebar-container">
          <div className="sidebar-icon-container" />
          <ul className="sidebar-main">
            <a href="#">
              <li>queue</li>
            </a>
            <a href="#">
              <li>who's online</li>
            </a>
            <a href="#">
              <li>history</li>
            </a>
            <a href="#">
              <li>reputation</li>
            </a>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
