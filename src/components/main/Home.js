import React, { Component } from "react";
import Logo from "../Logo";
import ImageLinkForm from "../ImageLinkForm";
import Rank from "../Rank";
import TranslateCont from "../TranslateContainer";
import FaceRecongnition from "../FaceRecongnition";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      imgUrl: "",
      box: {
        top_row: "",
        left_col: "",
        right_col: "",
        bottom_row: ""
      },
      user: {
        id: null,
        username: null,
        email: null,
        entries: 0,
        joined: new Date()
      },
      error: false
    };
  }
  async componentDidMount() {
    // Check to see if the token exist or not.
    const token = localStorage.getItem("token");
    if (!token) {
      return this.props.changeRouteFnc();
    }
    try {
      // Try to fetch and extract the user's information from that token.
      const resp = await fetch(
        "https://aqueous-wildwood-37808.herokuapp.com/profile",
        {
          method: "GET",
          headers: new Headers({
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          })
        }
      );
      const data = await resp.json();
      // If everything turns out ok set the user's data into the state.
      return this.setState({ user: data });
    } catch (e) {
      // The token is invalid or an unexpected error has happened. Fallout and Logout!
      localStorage.removeItem("token");
      console.log(e.message);
      return this.props.changeRouteFnc();
    }
  }
  onInputChange = e => {
    this.setState({ input: e.target.value });
  };
  calculateFaceFnc = data => {
    // This calculates the image box for it to be rendered into the screen.
    const faceBox = data;
    let faceImg = document.getElementById("face-img");
    let width = Number(faceImg.width);
    let height = Number(faceImg.height);
    return {
      leftCol: faceBox.left_col * width,
      topRow: faceBox.top_row * height,
      rightCol: width - faceBox.right_col * width,
      bottomRow: height - faceBox.bottom_row * height
    };
  };
  displayFaceBox = box => {
    return this.setState({ box });
  };
  onSubmit = async e => {
    e.preventDefault();
    try {
      // Lets send a request to our server for the coordinates.
      const resp = await fetch(
        "https://aqueous-wildwood-37808.herokuapp.com/image",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: Number(this.state.user.id),
            input: this.state.input
          })
        }
      );

      const data = await resp.json();
      // Extract the coordinates and put them into the state to be calculated and converted.
      // Do not update when there is an error.
      if (data.error) {
        this.setState({ error: true });
        return;
      }

      // No errors? Good! Let's update.
      this.setState({
        user: {
          ...this.state.user,
          entries: data.entries,
          error: false
        },
        imgUrl: this.state.input
      });
      // Calculate the facebox.
      let box = data.regions;
      this.displayFaceBox(this.calculateFaceFnc(box));
      document.querySelector(".img-url").value = "";
    } catch (e) {
      this.setState({ error: true });
      document.querySelector(".img-url").value = "";
    }
  };
  render() {
    const { username, entries } = this.state.user;
    return (
      <React.Fragment>
        <Logo />
        <TranslateCont>
          <Rank user={username} entries={entries} />
          <ImageLinkForm
            onInputChangeFnc={this.onInputChange}
            onBtnSubmitFnc={this.onSubmit}
            error={this.state.error}
          />
        </TranslateCont>

        <FaceRecongnition imgUrl={this.state.imgUrl} box={this.state.box} />
      </React.Fragment>
    );
  }
}

export default Home;
