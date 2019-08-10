import React, { Component } from 'react';

import './auth.modal.css';

class AuthModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      login: true,
      register: false,
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

    let formView = null;

    if (this.state.login) {
      formView = (
        <div className="auth-form">
          <div className="inputs-container">
            <div className="modal-box-input">
              <div className="">
                <label>username</label>
                <input />
              </div>
              <div className="">
                <label>password</label>
                <input type="password" />
              </div>
            </div>
          </div>
          {errorView}
          <div className="modal-box-actions">
            <button className="btn" onClick={this.search}>
              login
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
      );
    } else {
      formView = (
        <div className="auth-form">
          <div className="inputs-container">
            <div className="modal-box-input">
              <div className="">
                <label>username</label>
                <input />
              </div>
              <div className="">
                <label>password</label>
                <input type="password" />
              </div>
              <div className="">
                <label>secret</label>
                <input type="password" />
              </div>
            </div>
          </div>
          {errorView}
          <div className="modal-box-actions">
            <button className="btn" onClick={this.search}>
              register
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
      );
    }

    const modalBoxClass = this.state.login
      ? 'modal-box auth login'
      : 'modal-box auth register';

    return (
      <div className="modal">
        <div className={modalBoxClass}>
          <div className="tab">
            <div
              className="header login"
              onClick={() => {
                this.setState({ login: true, register: false });
              }}
            >
              <span>login</span>
            </div>
            <div
              className="header register"
              onClick={() => {
                this.setState({ login: false, register: true });
              }}
            >
              <span>register</span>
            </div>
          </div>
          {formView}
        </div>
      </div>
    );
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

export default AuthModal;
