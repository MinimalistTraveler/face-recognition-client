import React, { Component } from "react";
import PropTypes from "prop-types";
import "./CSS/imagelinkform.css";
class ImageLinkForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onInputChangeFnc: this.props.onInputChangeFnc,
      onBtnSubmitFnc: this.props.onBtnSubmitFnc,
      error: this.props.error
    };
  }
  static propTypes = {
    onInputChangeFnc: PropTypes.func.isRequired,
    onBtnSubmitFnc: PropTypes.func.isRequired,
    error: PropTypes.bool.isRequired
  };
  componentWillReceiveProps(nextProps) {
    this.setState({ error: nextProps.error });
  }
  render() {
    return (
      <div className="container">
        <div className="container-header">
          <h1>Image Link Form </h1>
          <p>
            This will detect any face within an image! Click on the submit
            button once you have finished entering in the image url
          </p>
        </div>
        {this.state.error ? (
          <div style={{ textAlign: "center" }}>
            <h1>Invalid Link</h1>
            <p>
              The link you have provided is invalid. Please try another link.
            </p>
          </div>
        ) : null}
        <form className="container-form">
          <div className="form-group">
            <label htmlFor="image url">Image Url</label>
            <input
              type="text"
              className="img-url"
              onChange={this.state.onInputChangeFnc}
            />
          </div>
          <button
            className="btn btn-submit"
            onClick={this.state.onBtnSubmitFnc.bind(this)}
          >
            Detect
          </button>
        </form>
      </div>
    );
  }
}
export default ImageLinkForm;
