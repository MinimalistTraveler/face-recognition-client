import React, { Component } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import "./CSS/register.css";
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      error: false,
      typeOfError: "",
      changeRoute: this.props.changeRouteFnc
    };
  }

  async componentWillUnmount() {
    await this.changeSignIn;
  }
  changeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  validate = (username, email, password) => {
    // Check Username
    if (username.length < 5) {
      return {
        error: true,
        errorType: "Username can't be less than 5 characters."
      };
    }
    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      return {
        error: true,
        errorType: "Invalid username letters and numbers only."
      };
    }

    // Check Email.
    // eslint-disable-next-line
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email.match(emailRegex)) {
      return {
        error: true,
        errorType: "Please enter a valid email address."
      };
    }
    // Check Password
    const passwordReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!password.match(passwordReg)) {
      return {
        error: true,
        errorType:
          "Either the password is not more than 8 characters or it doesn't contain a letter, a number, or a special character"
      };
    }
    return {
      error: undefined,
      errorType: null
    };
  };
  changeSignIn = async e => {
    const { username, email, password } = this.state;

    // Check Username, Email and Password
    const { error, errorType } = this.validate(username, email, password);
    try {
      if (!error) {
        // No errors let's update.
        this.setState({ error: false, typeOfError: null });
        // If everything is good fetch it
        const resp = await fetch("ROUTE", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            email,
            password
          })
        });
        const data = await resp.json();
        if (!data.error) {
          // Go to the homepage to sign in.
        } else {
          this.setState({ error: true, typeOfError: data.error });
          e.preventDefault();
          return;
        }
      } else {
        this.setState({ error: true, typeOfError: errorType });
        e.preventDefault();
        return;
      }
    } catch (e) {
      console.log(e.message);
      return;
    }
  };
  render() {
    return (
      <div className="register_container">
        {/* Form */}
        <div>
          <div className="register_header">
            <h1>Sign Up</h1>
            <p>
              Please enter in your details here. Once finished, click sign up to
              complete form.
            </p>
          </div>
          {this.state.error ? (
            <div className="error">
              <p>{this.state.typeOfError}</p>
            </div>
          ) : null}
          <div className="form_group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              onChange={this.changeInput}
              className={classNames({ errorInput: this.state.error })}
            />
          </div>
          <div className="form_group">
            <label htmlFor="username">Email:</label>
            <input
              type="email"
              name="email"
              onChange={this.changeInput}
              className={classNames({ errorInput: this.state.error })}
            />
          </div>
          <div className="form_group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              onChange={this.changeInput}
              className={classNames({ errorInput: this.state.error })}
            />
          </div>

          <Link className="reg-btn" onClick={this.changeSignIn} to="/">
            Sign Up
          </Link>
        </div>
      </div>
    );
  }
}
