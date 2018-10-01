import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./styles.css";
import Container from "./components/Presentational";
import store from "./store/store";

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<AppWrapper />, rootElement);
