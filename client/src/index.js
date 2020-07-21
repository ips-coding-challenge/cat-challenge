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
