import React, { Component } from "react";
import "./CSS/logo.css";
import Tilt from "react-tilt";
class Logo extends Component {
  render() {
    return (
      <Tilt options={{ max: 55 }} style={{ width: 150 }} className="logo">
        <div className="Tilt-inner">
          <img
            className="logo-img"
            src="https://www.hsdtaxlaw.com/wp-content/uploads/2016/05/logo_placeholder.png"
            alt="logo"
          />
        </div>
      </Tilt>
    );
  }
}

export default Logo;
