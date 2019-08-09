import React, { Component } from 'react';

import * as API from '../../api';

import { Url } from '../../utils/validation.utils';

import './modal.box.css';

const QUERY_TYPES = {
  KEYWORD: 'keyword',
  ID: 'id'
};

class SearchModal extends Component {
  constructor(props) {
    super(props);

    this.searchInputQuery = React.createRef();
    this.searchInputUrl = React.createRef();

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
          <div className="header">queue item</div>
          <div className="inputs-container">
            <div className="modal-box-input">
              <div className="search">
                <label>search by query</label>
                <input
                  type="search"
                  id="query"
                  autoComplete="off"
                  ref={this.searchInputQuery}
                  onKeyDown={this.handleKeyDown}
                  onChange={event => {
                    this.handleQueryChange(event);
                  }}
                  placeholder="enter song name.."
                />
              </div>
              <span>or</span>
              <div className="search">
                <label>search by url</label>
                <input
                  type="search"
                  id="url"
                  autoComplete="off"
                  ref={this.searchInputUrl}
                  onKeyDown={this.handleKeyDown}
                  onChange={event => {
                    this.handleQueryChange(event, QUERY_TYPES.ID);
                  }}
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

  handleQueryChange = (event, type = QUERY_TYPES.KEYWORD) => {
    if (type === QUERY_TYPES.ID) {
      this.searchInputQuery.current.value = '';
    } else {
      this.searchInputUrl.current.value = '';
    }

    this.setState({ query: event.target.value, queryType: type });
  };

  search = async () => {
    let query = this.state.query;

    this.resetErrors();

    if (!query && query.length < 1) {
      return this.addError('invalid query');
    }

    if (this.state.queryType === QUERY_TYPES.ID) {
      query = this.getIdFromYoutubeUrl(query);
    }

    try {
      const video = await API.search(query, this.state.queryType);
      this.props.searchCallback(video);
      this.props.onCloseCallback();
    } catch (error) {
      this.addError(error.message);
    }
  };

  getIdFromYoutubeUrl(url) {
    if (!Url.isValidYoutubeUrl(url)) {
      return this.addError('invalid youtube url');
    }

    const id = url.split('v=')[1];

    if (!id) {
      return this.addError('invalid youtube url');
    }

    return id;
  }

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
