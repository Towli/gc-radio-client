import React, { Component } from 'react';
import './topbar.css';

class Topbar extends Component {
  render() {
    return (
      <div className="topbar">
        <div className="header">
          <a href="#" className="app-name">
            bonk.fm
          </a>
        </div>
      </div>
    );
  }
}

export default Topbar;
