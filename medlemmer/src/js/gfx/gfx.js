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


  // Initializing basemap/layer id lists
  this.layerIds = new Array();


  // Generating Leaflet map
  this.map = new LMap(instanceNum, zoom, initLat, initLng);




 /**
  * Method for adding layer based on data-source type
  *
  * @param {string} title The layer title
  * @param {string} url The url to fetch data from
  */
  this.addLayerFromURL = (title, url, popupCont) => {

    $.getJSON(url, (data, status) => {
      if(status == "success" && data.success) {

        let hash = this.addLayer(title);

        for(var urld of data.result) {
          L.esri.Geocoding.geocode().address(urld.main_adddress).run((err, results, response) => {
            let res = results.results[0];
            this.addMarker(res.latlng.lat, res.latlng.lng,
              `<h5>${urld.name}</h5>
               <p>
                type: ${urld.type} <br>
                description: ${urld.description} <br>
                <a href=\"${urld.website}\" target=\"_blank\">Nettsted</a>
               </p>`,
            hash);
          });
          /*
          geojson["features"].push({
            "type": "Feature",
            "properties": {
              "id": urld.id,
              "type": urld.type,
              "title": urld.title,
              "name": urld.name,
              "display_name": urld.display_name,
              "description": urld.description,
              "contact_email": urld.contact_email,
              "contact_mobile": urld.contact_mobile,
              "contact_name": urld.contact_name,
              "contact_title": urld.contact_title,
              "organization_number": urld.organization_number,
              "organization_type": urld.organization_type,
              "approval_status": urld.approval_status,
              "state": urld.state,
              "phone": urld.phone,
              "segment": urld.segment,
              "website": urld.website
            },
            "geometry": {
              "type": "Point",
              "coordinates": [latlng.lat, latlng.lng]
            }
          });
          */
        }

      }else
        alert("Error: could not reach url");
    });
  };


 /**
  * Method for adding a layer to the api map
  *
  * @param {string} hash The id of the layer to add the marker to
  * @param {number} lat The latitude value of the marker
  * @param {number} lng The longitude value of the marker
  * @param {string} popupCont The popup content of the marker should display
  */
  this.addMarker = (hash, lat, lng, popupCont) => {
    try {
      this.map.addMarker(hash, EpochTime(), lat, lng, popupCont);
    }catch(err) {
      console.error(err);
    }
  };


 /**
  * Method for adding a layer to the api map
  *
  * @param {string} title The name of the layer to be added
  */
  this.addLayer = (title) => {
    let hash = EpochTime();
    this.layerIds.push(hash);

    try {
      this.map.addLayer(hash, title);
      return hash;
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
