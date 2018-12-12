"use strict";

import {EpochTime} from "../helper/EpochTime.js";
import {LMap} from "../map/LMap.js";
import {addLayerModal} from "../helper/mapModals.js";


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
  this.map = new LMap(instanceNum, zoom, initLat, initLng);




 /**
  * Binds the object methods to all necessary HTML geojsonSourceelements as event listeners.
  */
  this.init = () => {

    // Binding 'Add' button in 'Add layer' modal
    $("div#addLayerModal button#addLayer").click((e) => {
      let type = $("div#addLayerModal a[aria-expanded=\"true\"]").attr("data-layerType");
      let title = $("div#addLayerModal input#layerTitle").val();
      let callObj = {
        style: (feature) => {return feature.properties.color;}
      };

      switch (type) {
        case "file":
          let dataFile = $("input#geojsonSource")[0].files[0];

          this.addLayerFrom(type, title, callObj, (layer) => {
            return layer.feature.properties.description;
          }, dataFile);

          break;

        case "url":
          let url = "http://" + $("div#addLayerModal input#geojsonURL").val();

          this.addLayerFrom(type, title, callObj, (layer) => {
            return layer.feature.properties.Belysning;
          }, url);

          break;

        default:
          console.error("LAYER-TYPE ERROR: Layer type not defined");
      }
    });

  };




 /**
  * Method for adding layer based on data-source type
  *
  * @param {string} type The layer type
  * @param {string} title The layer title
  * @param {callback} callObj The object containing all callback to be performed on the data
  * @param {callback} popupCall The callback that generates the popup content
  */
  this.addLayerFrom = (type, title, callObj, popupCall, ...rest) => {
    switch (type) {
      case "file":
        let dataFile = rest[0];
        if(dataFile.name.match(/\.(geojson|json)$/gi)) {
          let fr = new FileReader();
          fr.onload = (ev) => {
            console.log(ev.target.result);

            this.addLayer(title, ev.target.result, callObj, popupCall);

            $("div#addLayerModal input#layerTitle").val("");
          }
          fr.readAsDataURL(dataFile);
        }else
          alert("Filetype does not match .geojson or .json");
        break;

      case "url":
        let url = rest[0];

        $.getJSON(url, (data, status) => {
          if(status == "success") {
            this.addLayer(title, data, callObj, popupCall);

            $("div#addLayerModal input#layerTitle").val("");
            $("div#addLayerModal input#geojsonURL").val("");
          }else
            alert("Error: could not reach url");
        });
        break;

      default:
        console.error("LAYER-TYPE ERROR: Layer type not defined");
    }
  };




 /**
  * Method for reseting all events on the basemap's edit/delete buttons
  */
  this.resetControlsEvents = () => {
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
  * @param {callback} callObj The object containing all callback to be performed on the data
  * @param {callback} popupCall The callback that generates the popup content
  */
  this.addLayer = (title, data, callObj, popupCall) => {
    let hash = EpochTime();
    this.layerIds.push(hash);

    try {
      this.map.addLayer(hash, title, data, callObj, popupCall);
    }catch(err) {
      console.error(err);
    }

    // Binds the layer edit/delete buttons
    this.resetControlsEvents();
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

 /**
  * Method for binding events to edit/delete buttons of any layer
  *
  * @param {string} hash The unique hash of the layer that the button is to be bound to
  */
  this.bindLayerButtons = (hash) => {
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
