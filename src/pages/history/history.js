import React, { Component } from 'react';
import HistoryItem from './history.item';

import './history.css';

import * as ws from '../../utils/websocket.utils';

class History extends Component {
  render() {
    const items = this.props.items;
    if (items.length < 1) {
      return (
        <div className="history-container">
          <div className="history">No History</div>
        </div>
      );
    }

    return (
      <div className="history-container">
        <h2 className="title">history</h2>
        <div className="history">
          {items.map((item, index) => {
            let parsedItem = JSON.parse(item);
            return (
              <HistoryItem
                key={index}
                index={index + 1}
                name={parsedItem.title}
                thumbnail={parsedItem.thumbnail}
                duration={parsedItem.duration}
                user={parsedItem.user}
                callback={this.addToQueue}
              />
            );
          })}
        </div>
      </div>
    );
  }

  addToQueue = index => {
    ws.addToPlaylist(this.props.items[index - 1]);
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.items !== nextProps.item;
  }

  componentDidMount() {
    ws.emit(ws.ACTIONS.HISTORY_FETCH);
  }
}

export default History;
