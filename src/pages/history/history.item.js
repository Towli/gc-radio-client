import React, { Component } from 'react';
import './history.item.css';

class History extends Component {
  render() {
    return (
      <div className="history-item">
        <img className="item-thumbnail" src={this.props.thumbnail.url} alt='thumb'/>
        <div className="item-detail">
          <span className="item-name">{this.decodeHtmlEncodedName(this.props.name)}</span>
          <span className="item-duration">
            duration: {this.convertMsToTime(this.props.duration)}
          </span>
          <span className="item-user">user: {this.props.user || 'anon'}</span>
        </div>
        <div className="item-actions">
          <button
            className="btn"
            onClick={() => {
              this.props.callback(this.props.index);
            }}
          >
            add to queue
          </button>
        </div>
      </div>
    );
  }

  convertMsToTime(ms) {
    return new Date(ms)
      .toISOString()
      .slice(11, -1)
      .split('.')[0];
  }

  decodeHtmlEncodedName(name) {
    return name.replace(/&#(\d+);/g, function(_match, dec) {
      return String.fromCharCode(dec);
    });
  }
}

export default History;
