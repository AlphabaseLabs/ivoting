import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";

const reducer = combineReducers({
  rootReducer: rootReducer,
});

const configureStore = () => createStore(reducer, applyMiddleware(thunk));

export default configureStore;
