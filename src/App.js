// Dependencies
import React, { Component } from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";
// CSS
import "./App.css";
// Components
import Navigation from "./components/Navigation";
import Home from "./components/main/Home";
import SignIn from "./components/SignIn";
import Register from "./components/Register";

class App extends Component {
  constructor() {
    super();
    this.state = {
      signIn: false,
      hasSignedIn: false,
      email: "",
      password: "",
      error: false
    };
  }

  componentDidMount() {
    // Check if the user has a token stored in local storage.
    const token = localStorage.getItem("token");
    // if so the user can skip the sign in page.
    if (!token) {
      // If the user doesn't have a token just ignore this and go to the login screen.
      return;
    }
    this.setState({ signIn: true });
  }
  changeRoute = cond => {
    if (cond === "signout") {
      localStorage.removeItem("token");
      return this.setState({ signIn: false });
    } else {
      return this.setState({ signIn: false });
    }
  };
  checkSignIn = async () => {
    try {
      // Get email and password
      const { email, password } = this.state;
      // Check email and password
      if (email.match(/^\s+/) || email === "") {
        throw Error("Invalid username or password");
      } else if (password.match(/^\s+/) || password === "") {
        throw Error("Invalid username or password");
      }
      // Get response if validation is successful
      const resp = await fetch(
        "https://aqueous-wildwood-37808.herokuapp.com/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password
          })
        }
      );
      const data = await resp.json();
      const { error } = data;
      localStorage.setItem("token", data.token);
      if (!error) {
        return this.setState({ signIn: true });
      }
      return;
    } catch (e) {
      document.querySelectorAll(".errorInput").forEach(item => {
        item.value = "";
      });
      this.setState({ email: "", password: "", error: true });
      console.log(e.message);
      return e.message;
    }
  };
  updateForm = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <React.Fragment>
            <Navigation
              signIn={this.state.signIn}
              changeRouteFnc={this.changeRoute}
            />
            {this.state.signIn === false ? (
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <SignIn
                      email={this.state.email}
                      password={this.state.password}
                      updateForm={this.updateForm}
                      error={this.state.error}
                      checkSignIn={this.checkSignIn}
                    />
                  )}
                />
                <Route
                  path="/register"
                  render={() => <Register changeRouteFnc={this.changeRoute} />}
                />
              </Switch>
            ) : (
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <Home
                      hasSignedIn={this.hasSignedIn}
                      changeRouteFnc={this.changeRoute}
                    />
                  )}
                />
              </Switch>
            )}
          </React.Fragment>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
