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
  this.basemapIds = new Array();
  this.layerIds = new Array();


  // Generating Leaflet map
  this.map = new LMap(instanceNum, zoom, initLat, initLng);




 /**
  * Method for adding layer based on data-source type
  *
  * @param {string} title The layer title
  * @param {string} url The url to fetch data from
  * @param {callback} callObj The object containing all callback to be performed on the data
  */
  this.addLayerFromURL = (title, url, callObj) => {

    $.getJSON(url, (data, status) => {
      if(status == "success" && data.success) {

        let geojson = {
          "type": "FeatureCollection",
          "features": []
        };

        L.esri.Geocoding.geocode().address(data.result[0].main_adddress).run((err, results, response) => {

          let res = results.results[0];
          //let urld = data.result[0];
          for(var urld of data.result)
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
                "website": urld.website,
              },
              "geometry": {
                "type": "Point",
                "coordinates": [res.latlng.lat, res.latlng.lng]
              }
            });

          console.log(geojson);

          this.addLayer(title, geojson, callObj);
        });

      }else
        alert("Error: could not reach url");
    });
  };


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
