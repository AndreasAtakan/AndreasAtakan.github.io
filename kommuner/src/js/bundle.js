"use strict";








function EpochTime() {
  return (new Date).getTime().toString();
}








/**
 * Initializing function for api map
 *
 * @param {number} instanseNum The index of the map-container to be used
 * @param {number} zoom The zoom level the map is to be initialized to
 * @param {number} initLat The latitude value the map is to be initialized to
 * @param {number} initLng The longitude value the map is to be initialized to
 */
function LMap(instanceNum, zoom, initLat, initLng) {
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
    zoom: zoom,
    layers: [this.basemaps[0]]
  });
  L.control.zoom({
    position: "bottomleft"
  }).addTo(this.apimap);



  let underlay = {};
  underlay["Google Maps &nbsp;&nbsp;"] = this.basemaps[0];
  underlay["OpenStreetMap &nbsp;&nbsp;"] = this.basemaps[1];

  let overlay = {};

  this.mapControl = L.control.layers(underlay, overlay, {
    position: "bottomright"
  }).addTo(this.apimap);



  // Creates a maker cluster
  this.markercluster = L.markerClusterGroup();
  this.apimap.addLayer(this.markercluster);





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
  * @param {callback} callObj The object containing all callback to be performed on the data
  * @param {callback} popupCall The callback that generates the popup content
  *
  * @throws An error if the layer type is not defined
  */
  this.addLayer = (hash, title, data, callObj) => {

    let layer = L.geoJSON(data, callObj);

    layer.options.id = hash;
    layer.options.type = "geojson";
    layer.options.title = title;

    this.layers.push(layer);

    this.markercluster.addLayer(layer);
    //this.apimap.addLayer(layer);

    let attribStr = `<span id=\"${hash}\">${title}</span>`;

    this.mapControl.addOverlay(this.markercluster, attribStr);
  };


 /**
  * Method for getting a layer on the map
  *
  * @param {string} hash The unique hash of the layer to be returned
  *
  * @return {object} The layer with id equal to 'hash'
  */
  this.getLayer = (hash) => {
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
  this.getLayerPos = (hash) => {
    for(let x = 0; x < this.layers.length; x++)
      if(this.layers[x].options.id == hash)
        return x;
  };

 /**
  * Method for removing a layer from the map
  *
  * @param {string} hash The unique hash of the layer to be removed
  */
  this.removeLayer = (hash) => {
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
  this.activateLayer = (hash) => {
    this.apimap.addLayer(this.getLayer(hash));
  };
}








/**
 * Initializing function, populates container with all HTML content and generates map
 *
 * @param {DOM-element} container The container
 * @param {number} instanseNum The index of the map to generated. This is to distinguish between the maps in the page
 * @param {number} zoom The zoom level the map is to be initialized to
 * @param {number} initLat The latitude value the map is to be initialized to
 * @param {number} initLng The longitude value the map is to be initialized to
 */
function gfx(container, instanceNum, zoom, initLat, initLng) {

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








let geojson = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id":"1",
      "properties": {
        "Navn": "Bærum kommune",
        "Innbyggertall": "118 588",
        "Område": "192 km²",
        "Nettsted": "https://www.baerum.kommune.no/"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [ 10.527787, 59.890905 ]
      }
    },
    {
      "type": "Feature",
      "id":"2",
      "properties": {
        "Navn": "Drammen kommune",
        "Innbyggertall": "66 214",
        "Område": "137 km²",
        "Nettsted": "https://www.drammen.kommune.no/"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [ 10.20449, 59.74389 ]
      }
    },
    {
      "type": "Feature",
      "id":"3",
      "properties": {
        "Navn": "Gjesdal kommune",
        "Innbyggertall": "11 317",
        "Område": "617 km²",
        "Nettsted": "https://www.gjesdal.kommune.no/"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [ 6.00861111, 58.78194444 ]
      }
    },
    {
      "type": "Feature",
      "id":"4",
      "properties": {
        "Navn": "Oslo kommune",
        "Innbyggertall": "634 293",
        "Område": "454 km²",
        "Nettsted": "https://www.oslo.kommune.no/"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [ 10.757933, 59.911491 ]
      }
    },
    {
      "type": "Feature",
      "id":"5",
      "properties": {
        "Navn": "Randaberg kommune",
        "Innbyggertall": "10 416",
        "Område": "24 km²",
        "Nettsted": "https://www.randaberg.kommune.no/"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [ 5.61527778, 59.00166667 ]
      }
    },
    {
      "type": "Feature",
      "id":"6",
      "properties": {
        "Navn": "Stavanger kommune",
        "Innbyggertall": "130 754",
        "Område": "71 km²",
        "Nettsted": "https://www.stavanger.kommune.no/"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [ 5.71000000, 58.97000000 ]
      }
    },
    {
      "type": "Feature",
      "id":"6",
      "properties": {
        "Navn": "Tromsø kommune",
        "Innbyggertall": "71 590",
        "Område": "2 520 km²",
        "Nettsted": "https://www.tromso.kommune.no/"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [ 18.93333333, 69.66666667 ]
      }
    },
    {
      "type": "Feature",
      "id":"6",
      "properties": {
        "Navn": "Trondheim kommune",
        "Innbyggertall": "182 035",
        "Område": "341 km²",
        "Nettsted": "https://www.trondheim.kommune.no/"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [ 10.40000000, 63.44000000 ]
      }
    }
  ]
};
