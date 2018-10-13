import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Particles from "react-particles-js";
ReactDOM.render(
  <React.Fragment>
    <Particles
      params={{
        polygon: {
          enable: true,
          type: "inside",
          move: {
            radius: 3
          }
        }
      }}
      className="particles-bg"
    />
    <App />
  </React.Fragment>,
  document.getElementById("root")
);
registerServiceWorker();
