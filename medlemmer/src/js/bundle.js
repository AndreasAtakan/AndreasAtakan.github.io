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
     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                   id: hash,
                   attribution: "&copy; <a href=\"http://openstreetmap.org/copyright\" target=\"_blank\">OpenStreetMap</a> contributors"
                 }),
     L.tileLayer("https://www.google.com/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}", {
                   id: (parseInt(hash) + 1).toString(),
                   attribution: "&copy; <a href=\"https://www.google.com/\" target=\"_blank\">Google Maps</a> contributors"
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
   underlay["OpenStreetMap &nbsp;&nbsp;"] = this.basemaps[0];
   underlay["Google Maps &nbsp;&nbsp;"] = this.basemaps[1];

   let overlay = {};

   this.mapControl = L.control.layers(underlay, overlay, {
     position: "bottomright"
   }).addTo(this.apimap);





   // Initializes the geolocation map search
   this.searchControl = L.esri.Geocoding.geosearch({
     position: "topleft"
   }).addTo(this.apimap);
   /*
   L.Control.geocoder({
     defaultMarkGeocode: false
   }).on("markgeocode", (e) => {
     this.apimap.setView({
       "lat": e.geocode.center.lat,
       "lng": e.geocode.center.lng
     }, 12);
   }).addTo(this.apimap);
   */









  /**
   * Method for adding a layer to the map
   *
   * @param {string} hash The unique hash of the marker to be added
   * @param {number} lat The latitude value of the marker
   * @param {number} lng The longitude value of the marker
   * @param {string} popupCont The popup content of the marker should display
   * @param {Array<?>} rest A, possibly empty, list of id's. These are the id's of the layers that the maper is to be added to
   *
   * @return {string} The id of the new marker
   *
   * @throws An error if the layer type is not defined
   */
   this.addMarker = (hash, lat, lng, popupCont, ...rest) => {
     let marker = L.marker({"lat": lat, "lng": lng}).bindPopup(popupCont);

     marker.options.id = hash;

     for(var id of rest)
       this.getLayer(id).addLayer(marker);

     return hash;
   };


  /**
   * Method for adding a layer to the map
   *
   * @param {string} hash The unique hash of the layer to be added
   * @param {string} title The name of the layer to be added
   *
   * @throws An error if the layer type is not defined
   */
   this.addLayer = (hash, title) => {
     let layer = L.markerClusterGroup();

     layer.options.id = hash;
     layer.options.type = "MarkerCluster";
     layer.options.title = title;

     this.layers.push(layer);

     this.apimap.addLayer(layer);
     this.mapControl.addOverlay(layer, `<span id=\"${hash}\">${title}</span>`);

     return hash;
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


   // Initializing basemap/layer id lists
   this.layerIds = new Array();


   // Generating Leaflet map
   this.map = new LMap(instanceNum, zoom, initLat, initLng);









  /**
   * Method for adding a layer to the api map
   *
   * @param {number} lat The latitude value of the marker
   * @param {number} lng The longitude value of the marker
   * @param {string} popupCont The popup content of the marker should display
   * @param {Array<?>} rest A, possibly empty, list of id's. These are the id's of the layers that the maper is to be added to
   *
   * @return {string} The id of the new marker
   */
   this.addMarker = (lat, lng, popupCont, ...rest) => {
     try {
       let _rest = ``;
       for(let i = 0; i < rest.length; i++)
         _rest += `rest[${i}]`;

       let hash = ``;

       // HACK: NOT A GOOD SOLUTION
       eval(`hash = this.map.addMarker(EpochTime(), lat, lng, popupCont, ${_rest});`);

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
   this.addLayer = (title) => {
     let hash = EpochTime();
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
