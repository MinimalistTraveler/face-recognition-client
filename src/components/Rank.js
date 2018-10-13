import React, { Component } from "react";
import "./CSS/rankcontainer.css";
class Rank extends Component {
  render() {
    return (
      <div className="rank-container">
        <p>
          {this.props.user} Your Current Entries is
          <span className="rank-number">{this.props.entries}</span>
        </p>
      </div>
    );
  }
}

export default Rank;
