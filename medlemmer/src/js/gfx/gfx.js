"use strict";

import {EpochTime} from "../helper/EpochTime.js";
import {LMap} from "../map/LMap.js";


/**
 * Initializing function, populates container with all HTML content and generates map
 *
 * @param {DOM-element} container The container
 * @param {number} instanseNum The index of the map to generated. This is to distinguish between the maps in the page
 * @param {number} zoom The zoom level the map is to be initialized to
 * @param {number} initLat The latitude value the map is to be initialized to
 * @param {number} initLng The longitude value the map is to be initialized to
 */
export function gfx(container, instanceNum, zoom, initLat, initLng) {

  // Initializing container content
  var cont = `<div class=\"mapcontainer\" id=\"map${instanceNum}\"></div>`;

  container.html(cont);


  // Initializing basemap/layer id lists
  this.layerIds = new Array();


  // Generating Leaflet map
  this.map = new LMap(instanceNum, zoom, initLat, initLng);









 /**
  * Method for adding a layer to the api map
  *
  * @param {number} lat The latitude value of the marker
  * @param {number} lng The longitude value of the marker
  * @param {string} iconUrl The url to the marker icon
  * @param {string} popupCont The popup content of the marker should display
  * @param {Array<?>} rest A, possibly empty, list of id's. These are the id's of the layers that the maper is to be added to
  *
  * @return {string} The id of the new marker
  */
  this.addMarker = function(lat, lng, iconUrl, popupCont, ...rest) {
    try {
      var _rest = ``;
      for(var i = 0; i < rest.length; i++)
        _rest += `rest[${i}]`;

      var hash = ``;

      // HACK: NOT A GOOD SOLUTION
      eval(`hash = this.map.addMarker(EpochTime(), lat, lng, iconUrl, popupCont, ${_rest});`);

      return hash;
    }catch(err) {
      console.error(err);
    }
  };


 /**
  * Method for adding a layer to the api map
  *
  * @param {string} title The name of the layer to be added
  */
  this.addLayer = function(title) {
    var hash = EpochTime();
    this.layerIds.push(hash);

    try {
      return this.map.addLayer(hash, title);
    }catch(err) {
      console.error(err);
    }
  };


 /**
  * Method for getting a layer from the api map
  *
  * @param {string} hash The unique hash of the layer to be returned
  *
  * @return {object} The layer with id equal to 'hash'
  */
  this.getLayer = function(hash) {
    return this.map.getLayer(hash);
  };


 /**
  * Method for removing a layer
  *
  * @param {string} hash The unique hash of the layer to be removed
  */
  this.removeLayer = function(hash) {
    this.map.removeLayer(hash);
    for(var x = 0; x < this.layerIds.length; x++) {
      if(this.layerIds[x] == hash) {
        this.layerIds.splice(x, 1);
        break;
      }
    }
  };
}
