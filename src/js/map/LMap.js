"use strict";

import {EpochTime} from "../helper/EpochTime.js";


/**
 * Initializing function for api map
 *
 * @param {number} instanseNum The index of the map-container to be used
 * @param {number} initLat The latitude value the map is to be initialized to
 * @param {number} initLng The longitude value the map is to be initialized to
 */
export function LMap(instanceNum, initLat, initLng) {
  this.id = EpochTime();
  this.instanceNum = instanceNum;
  this.initLat = initLat;
  this.initLng = initLng;

  let hash = EpochTime();
  this.basemaps = [
    L.tileLayer("http://www.google.com/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}", {
                  id: hash,
                  attribution: "&copy; <a href=\"https://www.google.com/\" target=\"_blank\">Google Maps</a> contributors"
                }),
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                  id: (parseInt(hash) + 1).toString(),
                  attribution: "&copy; <a href=\"http://openstreetmap.org/copyright\" target=\"_blank\">OpenStreetMap</a> contributors"
                })
  ];

  this.layers = new Array();

  this.apimap = L.map(`map${instanceNum}`, {
    center: [this.initLat, this.initLng],
    zoomControl: false,
    zoom: 5,
    layers: [this.basemaps[0]]
  });
  L.control.zoom({
    position: "bottomleft"
  }).addTo(this.apimap);



  let underlay = {};
  underlay["Google Maps &nbsp;&nbsp;"] = this.basemaps[0];
  underlay["OpenStreetMap &nbsp;&nbsp;"] = this.basemaps[1];

  let overlay = {};
  //overlay["Drawing layer &nbsp;&nbsp;"] = this.layers[0];

  this.mapControl = L.control.layers(underlay, overlay, {
    position: "bottomright"
  }).addTo(this.apimap);



  // Creates 'Add' button for adding layers
  L.easyButton("fa-map", () => {
    $('#addLayerModal').modal('show');
  }, "Add layer", "addLayerButton").addTo(this.apimap);





  // Initializes the geolocation map search from ESRI
  this.searchControl = L.esri.Geocoding.geosearch({
    position: "topleft"
  }).addTo(this.apimap);









 /**
  * Method for adding a layer to the map
  *
  * @param {string} hash The unique hash of the layer to be returned
  * @param {string} title The name of the layer to be added
  * @param {geoJSON} data The geoJSON data to generate the layer from
  *
  * @throws An error if the layer type is not defined
  */
  this.addLayer = function(hash, title, data) {

    let layer = L.geoJSON(data).addTo(this.apimap);

    layer.options.id = hash;
    layer.options.type = "geojson";
    layer.options.title = title;

    this.layers.push(layer);

    let attributionStr = `<span id=\"${hash}\">${title}</span>
                          &nbsp;&nbsp;
                          &nbsp;&nbsp;
                          <a class=\"px-2 fa-lg\"><i class=\"fa fa-trash\" id=\"layerDelete\" data-layerId=\"${hash}\"></i></a>
                          <!--a class=\"px-2 fa-lg\"><i class=\"fa fa-edit\" id=\"layerEdit\" data-layerId=\"${hash}\"></i></a-->`;

    this.mapControl.addOverlay(layer, attributionStr);
  };


 /**
  * Method for getting a layer on the map
  *
  * @param {string} hash The unique hash of the layer to be returned
  *
  * @return {object} The layer with id equal to 'hash'
  */
  this.getLayer = function(hash) {
    for(let x = 0; x < this.layers.length; x++)
      if(this.layers[x].options.id == hash)
        return this.layers[x];
  };



 /**
  * Method for getting the position of a layer in the layer list
  *
  * @param {string} hash The unique hash of the layer to get the position of
  *
  * @return {number} The position of the layer
  */
  this.getLayerPos = function(hash) {
    for(let x = 0; x < this.layers.length; x++)
      if(this.layers[x].options.id == hash)
        return x;
  };

 /**
  * Method for removing a layer from the map
  *
  * @param {string} hash The unique hash of the layer to be removed
  */
  this.removeLayer = function(hash) {
    let x = this.getLayerPos(hash);

    this.apimap.removeLayer(this.layers[x]);
    this.mapControl.removeLayer(this.layers[x]);
    this.layers.splice(x, 1);
  };

 /**
  * Method for activating a layer
  *
  * @param {string} hash The unique hash of the layer to be activated
  */
  this.activateLayer = function(hash) {
    this.apimap.addLayer(this.getLayer(hash));
  };
}
