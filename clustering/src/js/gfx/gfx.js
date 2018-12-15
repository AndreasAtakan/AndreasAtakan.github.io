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
  let cont = `<div class=\"mapcontainer\" id=\"map${instanceNum}\"></div>`;

  container.html(cont);


  // Initializing layer id lists
  this.basemapIds = new Array();
  this.layerIds = new Array();


  // Generating Leaflet map
  this.map = new LMap(instanceNum, zoom, initLat, initLng);




 /**
  * Method for adding a layer to the api map
  *
  * @param {string} title The name of the layer to be added
  * @param {geoJSON} data The geoJSON data to generate the layer from
  * @param {callback} callObj The object containing all callback to be performed on the data
  */
  this.addLayer = (title, data, callObj) => {
    let hash = EpochTime();
    this.layerIds.push(hash);

    try {
      this.map.addLayer(hash, title, data, callObj);
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
  this.getLayer = (hash) => {
    return this.map.getLayer(hash);
  };

 /**
  * Method for removing a layer
  *
  * @param {string} hash The unique hash of the layer to be removed
  */
  this.removeLayer = (hash) => {
    this.map.removeLayer(hash);
    for(let x = 0; x < this.layerIds.length; x++) {
      if(this.layerIds[x] == hash) {
        this.layerIds.splice(x, 1);
        break;
      }
    }
  };
}