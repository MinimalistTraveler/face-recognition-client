import React, { Component } from "react";
import PropTypes from "prop-types";
import "./CSS/signin.css";
import classNames from "classnames";

import { Link } from "react-router-dom";
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      password: this.props.password,
      error: this.props.error,
      updateForm: this.props.updateForm
    };
  }
  static propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
    updateForm: PropTypes.func.isRequired
  };
  componentWillReceiveProps(nextProps) {
    if (this.state.error !== nextProps.error) {
      this.setState({ error: nextProps.error });
    }
  }
  render() {
    return (
      <div className="signin_card">
        <div className="signin_card-header">
          <h1>Sign In</h1>
        </div>
        {this.state.error ? (
          <div className="error">
            <p>Invalid Username or Password</p>
          </div>
        ) : null}
        <div className="form_group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="email"
            name="email"
            className={classNames({ errorInput: this.state.error })}
            onChange={this.state.updateForm}
          />
        </div>
        <div className="form_group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={this.state.updateForm}
            className={classNames({ errorInput: this.state.error })}
          />
        </div>
        <div className="form_group">
          <label>
            <input type="checkbox" checked="checked" name="remember" readOnly />{" "}
            Remember me
          </label>
        </div>
        <button
          id="signin-btn"
          onClick={() => this.props.checkSignIn()}
          className="sign-btn"
        >
          Sign In
        </button>
        <Link to="/register" className="sign-btn">
          Register
        </Link>
      </div>
    );
  }
}
export default SignIn;
