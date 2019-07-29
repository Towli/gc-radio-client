import React, { Component } from 'react';

import * as API from '../../api';

import { Url } from '../../utils/validation.utils';

import './modal.box.css';

class SearchModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      query: '',
      errors: []
    };
  }
  render() {
    if (!this.state.show) {
      return null;
    }

    const errors = this.state.errors;

    let errorView = null;
    if (errors) {
      errorView = (
        <div className="errors">
          {errors.map((error, index) => {
            return <div key={index}>{error}</div>;
          })}
        </div>
      );
    }

    return (
      <div className="modal">
        <div className="modal-box">
          <div className="header">queue song</div>
          <div className="inputs-container">
            <div className="modal-box-input">
              <div className="search">
                <label>search by query</label>
                <input
                  type="search"
                  id="search"
                  onKeyDown={this.handleKeyDown}
                  onChange={this.handleQueryChange}
                  placeholder="enter song name.."
                />
              </div>
              <span>or</span>
              <div className="search">
                <label>search by url</label>
                <input
                  type="search"
                  id="search"
                  onKeyDown={this.handleKeyDown}
                  onChange={this.handleQueryChange}
                  placeholder="enter url.."
                />
              </div>
            </div>
          </div>
          {errorView}
          <div className="modal-box-actions">
            <button className="btn" onClick={this.search}>
              add to queue
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                this.closeModal();
              }}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  handleQueryChange = event => {
    this.setState({ query: event.target.value });
  };

  search = async () => {
    const query = this.state.query;

    this.resetErrors();

    if (!query && query.length < 1) {
      return this.addError('invalid query');
    }

    if (this.props.type === 'url') {
      if (!Url.isValid(query)) {
        return this.addError('invalid url');
      }
    }

    try {
      const video = await API.search(query);
      this.props.searchCallback(video);
      this.props.onCloseCallback();
    } catch (error) {
      this.addError(error.message);
    }
  };

  handleKeyDown = async event => {
    if (event.keyCode !== 13 || !event.target.value) {
      return;
    }

    this.search();
  };

  addError = error => {
    this.setState(state => {
      const errors = [...state.errors, error];

      return {
        errors
      };
    });
  };

  resetErrors() {
    this.setState({
      errors: []
    });
  }

  closeModal = () => {
    this.resetErrors();
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

export default SearchModal;
