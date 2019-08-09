import React, { Component } from 'react';
import './queue.css';

import * as ws from '../../utils/websocket.utils';
import QueueItem from './queue.item';

class Queue extends Component {
  constructor(props) {
    super(props);

    this.state = { items: [] };
  }
  render() {
    const items = this.state.items;
    if (items.length < 1) {
      return (
        <div className="queue-container">
          <div className="queue">Queue Empty</div>
        </div>
      );
    }
    console.log(items);

    return (
      <div className="queue-container">
        <h2 className="title">queue</h2>
        <div className="queue">
          {items.map((item, index) => {
            let parsedItem = JSON.parse(item);
            return (
              <QueueItem
                key={index}
                index={index + 1}
                name={parsedItem.title}
                thumbnail={parsedItem.thumbnail}
                duration={parsedItem.duration}
                user={parsedItem.user}
                callback={this.removeItem}
              />
            );
          })}
        </div>
      </div>
    );
  }

  removeItem(id) {
    ws.emit(ws.ACTIONS.PLAYLIST_REMOVE, id, () => {
      this.fetch();
    });
  }

  static getDerivedStateFromProps(props, state) {
    if (props.items && props.items !== state.items) {
      return {
        items: props.items
      };
    }

    return null;
  }

  componentDidMount() {
    ws.emit(ws.ACTIONS.PLAYLIST_FETCH, {}, playlist => {
      console.log('playlist: ', playlist);
    });
  }

  fetch() {
    ws.emit(ws.ACTIONS.PLAYLIST_FETCH, {}, playlist => {
      console.log('playlist: ', playlist);
    });
  }
}

export default Queue;
