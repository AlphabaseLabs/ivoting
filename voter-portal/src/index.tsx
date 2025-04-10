import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { createBrowserHistory } from "history";
import configureStore from "./Store/store";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";

const store = configureStore();
const hist = createBrowserHistory();

const RootApp = () => (
  <Provider store={store}>
    <Router history={hist}>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(
  <>
    <RootApp />
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
