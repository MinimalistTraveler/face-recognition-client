import React, { Component } from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";
import "./CSS/navigation.css";
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeRoute: this.props.changeRouteFnc,
      signIn: this.props.signIn
    };
  }
  static propTypes = {
    signIn: Proptypes.bool.isRequired
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      changeRoute: nextProps.changeRouteFnc,
      signIn: nextProps.signIn
    });
  }
  render() {
    return (
      <nav className="navbar">
        {this.state.signIn === false ? (
          <Link className="btn" to="/">
            Sign In
          </Link>
        ) : (
          <button
            className="btn"
            onClick={() => this.state.changeRoute("signout")}
          >
            Sign Out
          </button>
        )}
      </nav>
    );
  }
}

export default Navigation;
