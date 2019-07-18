import React, { Component } from 'react';
import './playlist.item.css';

class PlaylistItem extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="playlist-item">
        <h2 className="title">{this.props.name}</h2>
        <div className="contributor">{this.props.contributor}</div>
      </div>
    );
  }
}

export default PlaylistItem;
