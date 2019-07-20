import React, { Component } from 'react';
import * as API from '../api';
// import './search.css';

import { Url } from '../utils/validation.utils';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };
  }
  render() {
    const errors = this.state.errors;
    const label = this.props.label;

    let errorView = null;
    if (errors) {
      errorView = (
        <div className="errors">
          {errors.map(error => {
            return <div>{error}</div>;
          })}
        </div>
      );
    }
    return (
      <div className="search">
        <label>{label}</label>
        <input
          type="search"
          id="search"
          onKeyDown={this.handleKeyDown}
          placeholder="enter song name.."
        />
        {errorView}
      </div>
    );
  }

  handleKeyDown = async event => {
    if (event.keyCode !== 13 || !event.target.value) {
      return;
    }

    this.setState({
      errors: []
    });

    const query = event.target.value;

    if (this.props.type === 'url') {
      if (!Url.isValid(query)) {
        const errors = this.state.errors;
        errors.push('Not a valid URL');
        return this.setState({
          errors: errors
        });
      }
    }

    try {
      const url = await API.search(query);
      this.props.callback(url);
    } catch (error) {
      const errors = this.state.errors;
      errors.push(error.message);

      this.setState({
        errors: errors
      });
    }
  };
}

export default Search;
