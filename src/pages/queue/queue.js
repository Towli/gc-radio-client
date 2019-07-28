import React, { Component } from 'react';
import './queue.css';

import QueueItem from './queue.item';

class Queue extends Component {
  constructor(props) {
    super(props);

    this.state = { items: [] };
  }
  render() {
    console.log(this.state.items);
    const items = this.state.items;
    if (items.length < 1) {
      return (
        <div className="queue-container">
          <div className="queue">Queue Empty</div>
        </div>
      );
    }

    console.log('render: ', this.state.items);

    return (
      <div className="queue-container">
        <div class="queue">
          {items.map((item, index) => {
            return (
              <QueueItem
                key={index}
                name={item.name}
                duration={item.duration}
                user={item.user}
              />
            );
          })}
        </div>
      </div>
    );
  }

  static getDerivedStateFromProps(props, state) {
    if (props.items && props.items !== state.items) {
      return {
        items: props.items
      };
    }

    return null;
  }
}

export default Queue;
