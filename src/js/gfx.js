"use strict";

import {EpochTime} from "./helper/EpochTime.js";
import {LMap} from "./map/LMap.js";
import {addLayerModal} from "./helper/mapModals.js";


/**
 * Initializing function, populates container with all HTML content and generates map
 *
 * @param {DOM-element} container The container
 * @param {number} instanseNum The index of the map to generated. This is to distinguish between the maps in the page
 * @param {number} initLat The latitude value the map is to be initialized to
 * @param {number} initLng The longitude value the map is to be initialized to
 */
export function gfx(container, instanceNum, initLat, initLng) {
  console.info("Running in test mode");


  // Initializing container content
  let cont = ``;

  cont += addLayerModal;
  cont += `
    <div class=\"mapcontainer\" id=\"map${instanceNum}\"></div>
  `;

  container.html(cont);


  // Initializing layer id lists
  this.basemapIds = new Array();
  this.layerIds = new Array();


  // Generating Leaflet map
  this.map = new LMap(instanceNum, initLat, initLng);




 /**
  * Binds the class methods to all necessary HTML elements as event listeners.
  */
  this.init = function() {

    // Binding 'Add' button in 'Add layer' modal
    $("div#addLayerModal button#addLayer").click((e) => {
      let title = $("div#addLayerModal input#layerTitle").val();
      let data = {};
      console.log(title);
      //let type = $("div#addLayerModal a[aria-expanded=\"true\"]").attr("data-layerType");

      this.addLayer(title, data);

      $("div#addLayerModal input#layerTitle").val("");

      // Binds the layer edit/delete buttons
      this.resetControlsEvents();
    });

  };




 /**
  * Method for reseting all events on the basemap's edit/delete buttons
  */
  this.resetControlsEvents = function() {
    // NOTE: This function call is probably not the best way of solving the
    //       `click-events-cleared-on-layer-changes` problem.
    //       In true Javascript fashion; if it works, don't question it.

    // Resetting layer-controls events
    for(let x = 0; x < this.layerIds.length; x++)
      this.bindLayerButtons(this.layerIds[x]);
  };




 /**
  * Method for adding a layer to the api map
  *
  * @param {string} title The name of the layer to be added
  * @param {geoJSON} data The geoJSON data to generate the layer from
  */
  this.addLayer = function(title, data) {
    let hash = EpochTime();
    this.layerIds.push(hash);

    try {
      this.map.addLayer(hash, title, data);
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
    for(let x = 0; x < this.layerIds.length; x++) {
      if(this.layerIds[x] == hash) {
        this.layerIds.splice(x, 1);
        break;
      }
    }
  };

 /**
  * Method for binding events to edit/delete buttons of any layer
  *
  * @param {string} hash The unique hash of the layer that the button is to be bound to
  */
  this.bindLayerButtons = function(hash) {
    let editBtn = `i#layerEdit[data-layerId=\"${hash}\"]`,
        deleteBtn = `i#layerDelete[data-layerId=\"${hash}\"]`;

    // NOTE: Updates the layer entry in the map controls. This is to fix the
    //       layer-names-reset-after-layer-update bug.
    let layer = this.getLayer(hash);
    $(`span#${hash}`).html(layer.options.title);



    /*
    $(editBtn).click((e) => {
      $("div#editDrawingLayerModal").modal("show");
      let id = e.target.dataset.layerid;
      let thisLayer = this.getLayer(id);

      $("div#editDrawingLayerModal input#drawingLayerTitle").val(thisLayer.options.title);
      $("div#editDrawingLayerModal textarea#drawingLayerDescription").val(thisLayer.options.description);

      $("div#editDrawingLayerModal button#updateDrawingLayer").attr("data-layerid", thisLayer.options.id);

      this.resetControlsEvents();
    });
    */


    $(deleteBtn).click((e) => {
      this.removeLayer(e.target.dataset.layerid);
      this.resetControlsEvents();
    });
  };
}














let maingfx = new gfx($(`div#container`), 0, 63, 12);
maingfx.init();
