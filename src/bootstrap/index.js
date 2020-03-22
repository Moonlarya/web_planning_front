import React from "react";

import "bootstrap/scss/bootstrap.scss";
import "../style/index.scss";

import * as serviceWorker from "./serviceWorker";

import App from "../App";

serviceWorker.unregister();

const Bootstrap = () => <App />;

export default Bootstrap;
