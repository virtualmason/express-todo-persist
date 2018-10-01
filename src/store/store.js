import { createStore } from "redux";
import messages from "../reducer/messages.js";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = createStore(
  messages,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);
export default store;
