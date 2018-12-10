"use strict";

import {EpochTime} from "../helper/EpochTime.js";

export function initMap(initLat, initLng) {
  let hash = EpochTime();

  let fBasemap = L.tileLayer("http://www.google.com/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
                            {
                              id: hash,
                              attribution: "&copy; <a href=\"https://www.google.com/\" target=\"_blank\">Google Maps</a> contributors"
                            });

  let sBasemap = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                            {
                              id: (parseInt(hash) + 1).toString(),
                              attribution: "&copy; <a href=\"http://openstreetmap.org/copyright\" target=\"_blank\">OpenStreetMap</a> contributors"
                            });



  window.map = L.map(`map`, {
    center: [initLat, initLng],
    zoomControl: false,
    zoom: 3,
    layers: [fBasemap]
  });

  L.control.zoom({
    position: 'bottomleft'
  }).addTo(window.map);


  let underlay = {};
  underlay["Google Maps &nbsp;&nbsp;"] = fBasemap;
  underlay["OpenStreetMap &nbsp;&nbsp;"] = sBasemap;

  let overlay = {};
  //overlay["Drawing layer &nbsp;&nbsp;"] = this.layers[0];

  window.mapControl = L.control.layers(underlay, overlay, {
    position: "bottomright"
  }).addTo(apiMap);
}
