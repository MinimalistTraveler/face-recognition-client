import React, { Component } from "react";
// import PropTypes from 'prop-types'
import "./CSS/facerecongnition.css";
class FaceRecongnition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: "",
      box: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      box: nextProps.box,
      imgUrl: nextProps.imgUrl
    });
  }
  render() {
    const { box } = this.state;
    return (
      <div className="face-rec-container">
        {this.state.imgUrl === "" ? (
          <h1
            style={{
              color: "#FFF",
              fontFamily: "Montserrat, sans-serif",
              textAlign: "center"
            }}
          >
            Nothing to see here. Add an image url to begin.
          </h1>
        ) : (
          <img id="face-img" src={this.state.imgUrl} alt="selected_image" />
        )}

        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            bottom: box.bottomRow,
            left: box.leftCol,
            right: box.rightCol
          }}
        />
      </div>
    );
  }
}
export default FaceRecongnition;
