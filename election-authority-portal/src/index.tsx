import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

import { Router, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
const hist = createBrowserHistory();

ReactDOM.render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    ,
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
