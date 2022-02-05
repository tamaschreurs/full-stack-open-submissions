import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { CssBaseline } from "@mui/material";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <CssBaseline />
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
