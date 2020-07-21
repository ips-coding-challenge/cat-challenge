import React from "react";
import "material-design-icons";
import ReactDOM from "react-dom";
import "typeface-raleway";
import "typeface-montserrat";
import "./index.css";
import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./store/store";
import SimpleReactLightbox from "simple-react-lightbox";
import * as serviceWorker from "./serviceWorker";

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SimpleReactLightbox>
        <App />
      </SimpleReactLightbox>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
