import React, { Component } from 'react';
import Search from '../search';

import './modal.box.css';

class ModalBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      errors: []
    };
  }
  render() {
    if (!this.state.show) {
      return null;
    }

    return (
      <div className="modal">
        <div className="modal-box">
          <div className="header">queue song</div>
          <div className="inputs-container">
            <div className="modal-box-input">
              <Search
                label="search"
                type="query"
                callback={this.handleResultingUrl}
              />
            </div>
            <span>or</span>
            <div className="modal-box-input">
              <Search
                label="url"
                type="url"
                callback={this.handleResultingUrl}
              />
            </div>
          </div>
          <div className="modal-box-actions">
            <button className="btn" onClick={this.props.onCloseCallback}>
              add to queue
            </button>
            <button
              className="btn btn-danger"
              onClick={this.props.onCloseCallback}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  handleResultingUrl = url => {
    if (!url) {
      throw new Error('Search resolved with non-url: ', url);
    }

    this.props.searchCallback && this.props.searchCallback(url);
    this.props.onCloseCallback();
  };

  static getDerivedStateFromProps(props, state) {
    if (props.show !== state.show) {
      return {
        show: props.show
      };
    }

    return null;
  }
}

export default ModalBox;
