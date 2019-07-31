import React, { Component } from 'react';
import './queue.item.css';

class Queue extends Component {
  render() {
    return (
      <div className="queue-item">
        <span className="item-index">{this.props.index}</span>
        <img className="item-thumbnail" src={this.props.thumbnail.url} />
        <div className="item-detail">
          <span className="item-name">{this.props.name}</span>
          <span className="item-duration">
            duration: {this.convertMsToTime(this.props.duration)}
          </span>
          <span className="item-user">user: {this.props.user || 'anon'}</span>
        </div>
        <div className="item-actions">
          <button className="btn btn-danger" onClick={this.remove}>
            remove
          </button>
        </div>
      </div>
    );
  }

  remove = () => {
    this.props.callback && this.props.callback(this.props.index - 1);
  };

  convertMsToTime(ms) {
    return new Date(ms)
      .toISOString()
      .slice(11, -1)
      .split('.')[0];
  }
}

export default Queue;
