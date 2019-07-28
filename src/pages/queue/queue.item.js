import React, { Component } from 'react';
import './queue.item.css';

class Queue extends Component {
  render() {
    return (
      <div className="queue-item">
        <div className="">
          {this.props.index}
          <h1>{this.props.name}</h1>
        </div>
        <div className="">
          <h2>{this.props.duration}</h2>
          <h3>{this.props.user}</h3>
        </div>
      </div>
    );
  }
}

export default Queue;
