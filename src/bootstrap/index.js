import React from "react";

import "moment/locale/ru";

import "bootstrap/scss/bootstrap.scss";
import "../style/index.scss";

import * as serviceWorker from "./serviceWorker";

import Router from "../Router";

serviceWorker.unregister();

const Bootstrap = () => <Router />;

export default Bootstrap;
