import logo from "./logo.svg";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import AppWrapper from "./Views/AppWrapper/AppWrapper";
import Login from "./Views/Login/Login";
import { Provider } from "react-redux";
import configureStore from "./IndexStore/store";
const store = configureStore();

function App() {
  return (
    <>
      <Provider store={store}>
        <Switch>
          <Route path="/admin" exact component={AppWrapper} />
          <Route path="/" exact component={Login} />
        </Switch>
      </Provider>
    </>
  );
}

export default App;
