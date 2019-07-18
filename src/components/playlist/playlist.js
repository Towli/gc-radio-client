import React, { Component } from 'react';
import './playlist.css';

import PlaylistItem from './playlist.item';

class Playlist extends Component {
  constructor(props) {
    super(props);

    this.state = { list: [] };
  }
  render() {
    const list = this.state.list;
    const playlistItems = list.map((item, i) => {
      return (
        <PlaylistItem
          key={i}
          name={item.name}
          url={item.url}
          contributor={item.contributor}
        />
      );
    });

    return <div className="playlist-container">{playlistItems}</div>;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.list && props.list !== state.list) {
      return {
        list: props.list
      };
    }

    return null;
  }
}

export default Playlist;
