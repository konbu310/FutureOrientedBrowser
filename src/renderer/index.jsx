import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import { injectGlobal } from "emotion";

import BrowserStore from "./store/BrowserStore";
import KeyBrowser from "./components/KeyBrowser";

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    font-size: calc(18px + 0.25vw);
  }
`;

const stores = {
  browser: new BrowserStore(),
};

ReactDOM.render(
  <Provider {...stores}>
    <KeyBrowser />
  </Provider>,
  document.getElementById("root")
);
