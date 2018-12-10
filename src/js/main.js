"use strict";

import {initMap} from "./map/initMap.js";

function() {
  console.info("Running in production mode");

  window.map = null;
  window.mapControl = null;
  window.basemaps = new Array();
  window.layers = new Array();

  initMap(20, -25);
}();
