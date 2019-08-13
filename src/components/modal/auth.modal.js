import React, { Component } from 'react';

import * as API from '../../api';
import { Auth } from '../../utils/validation.utils';

import './auth.modal.css';

class AuthModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      login: true,
      inputUsername: null,
      inputPassword: null,
      inputSecret: null,
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
                <input
                  onChange={event => {
                    this.setState({ inputUsername: event.target.value });
                  }}
                />
              </div>
              <div className="">
                <label>password</label>
                <input
                  type="password"
                  onChange={event => {
                    this.setState({ inputPassword: event.target.value });
                  }}
                />
              </div>
            </div>
          </div>
          {errorView}
          <div className="modal-box-actions">
            <button className="btn" onClick={this.login}>
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
                <input
                  onChange={event => {
                    this.setState({ inputUsername: event.target.value });
                  }}
                />
              </div>
              <div className="">
                <label>password</label>
                <input
                  type="password"
                  onChange={event => {
                    this.setState({ inputPassword: event.target.value });
                  }}
                />
              </div>
              <div className="">
                <label>secret</label>
                <input
                  type="password"
                  onChange={event => {
                    this.setState({ inputSecret: event.target.value });
                  }}
                />
              </div>
            </div>
          </div>
          {errorView}
          <div className="modal-box-actions">
            <button className="btn" onClick={this.register}>
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
                this.resetErrors();
                this.setState({ login: true, register: false });
              }}
            >
              <span>login</span>
            </div>
            <div
              className="header register"
              onClick={() => {
                this.resetErrors();
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

  register = () => {
    this.resetErrors();

    const username = this.state.inputUsername;
    const password = this.state.inputPassword;
    const secret = this.state.inputSecret;

    if (!username || !password) {
      return this.addError('complete all fields u pepega');
    }

    if (!Auth.isValidPassword(password)) {
      return this.addError('password must be 8 chars or more');
    }

    if (!Auth.isValidUsername(username)) {
      this.addError('username must be between 3 and 30 chars');
    }

    if (!secret) {
      return this.addError('please enter a secret');
    }

    API.register(username, password, secret)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        this.addError(error.message);
      });
  };

  login = () => {
    this.resetErrors();

    const username = this.state.inputUsername;
    const password = this.state.inputPassword;

    if (!username || !password) {
      return this.addError('complete all fields u pepega');
    }

    API.login(username, password)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        this.addError(error.message);
      });
  };

  handleKeyDown = async event => {
    if (event.keyCode !== 13 || !event.target.value) {
      return;
    }

    // register() or login()
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
