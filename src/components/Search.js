import React, { Component } from 'react';
import * as API from '../api';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };
  }
  render() {
    const errors = this.state.errors;
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
    this.setState({
      errors: []
    });

    if (event.keyCode !== 13 || !event.target.value) {
      return;
    }

    const query = event.target.value;

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
