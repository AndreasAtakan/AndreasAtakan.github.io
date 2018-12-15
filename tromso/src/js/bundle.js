"use strict";








function EpochTime() {
  return (new Date).getTime().toString();
}








let addLayerModal = `
<div class=\"modal fade\" id=\"addLayerModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"addLayerModal\" aria-hidden=\"true\">

  <div class=\"modal-dialog\" role=\"document\">

    <div class=\"modal-content\">

      <div class=\"modal-header\">
        <h4 class=\"modal-title w-100\" id=\"addLayerModalHeader\">Add layer</h4>
        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
          <span aria-hidden=\"true\">&times;</span>
        </button>
      </div>

      <div class=\"modal-body\">
        <div class=\"container\">

          <div class=\"row\">
            <div class=\"col\">

              <!--form class=\"text-center\" action=\"\" method=\"post\" style=\"color: #757575;\"-->

                <!-- layer name -->
                <div class=\"md-form\">
                  <input type=\"text\" id=\"layerTitle\" class=\"form-control\">
                  <label for=\"layerTitle\">Layer title</label>
                </div>

                <!-- –––––––––––– -->
                <p><b>Choose a geoJSON source:</b></p>

                <!-- Accordion wrapper -->
                <div class=\"accordion\" id=\"layerTypeAccordion\" role=\"tablist\" aria-multiselectable=\"true\">

                  <!-- Accordion card -->
                  <div class=\"card\">

                    <!-- Card header -->
                    <div class=\"card-header\" role=\"tab\" id=\"geojsonFileHeading\">
                      <a class=\"collapsed\" data-toggle=\"collapse\" data-layerType=\"file\" href=\"#geojsonFileCollapse\" aria-expanded=\"false\" aria-controls=\"geojsonFileCollapse\">
                        <h6 class=\"mb-0\">
                          geoJSON file <i class=\"fa fa-angle-down rotate-icon\"></i>
                        </h6>
                      </a>
                    </div>

                    <!-- Card body -->
                    <div id=\"geojsonFileCollapse\" class=\"collapse\" role=\"tabpanel\" aria-labelledby=\"geojsonFileHeading\" data-parent=\"#layerTypeAccordion\">
                      <div class=\"card-body\">

                        <div class=\"md-form\">
                          <div class=\"btn btn-primary btn-sm\">
                            <input type=\"file\" id=\"geojsonSource\">
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                  <!-- Accordion card -->

                  <!-- Accordion card -->
                  <div class=\"card\">

                    <!-- Card header -->
                    <div class=\"card-header\" role=\"tab\" id=\"geojsonURLHeading\">
                      <a class=\"collapsed\" data-toggle=\"collapse\" data-layerType=\"url\" href=\"#geojsonURLCollapse\" aria-expanded=\"false\" aria-controls=\"geojsonURLCollapse\">
                        <h6 class=\"mb-0\">
                          geoJSON from URL <i class=\"fa fa-angle-down rotate-icon\"></i>
                        </h6>
                      </a>
                    </div>

                    <!-- Card body -->
                    <div id=\"geojsonURLCollapse\" class=\"collapse\" role=\"tabpanel\" aria-labelledby=\"geojsonURLHeading\" data-parent=\"#layerTypeAccordion\">
                      <div class=\"card-body\">

                        <!-- Iconset file -->
                        <div class=\"md-form\">
                          <input type=\"text\" id=\"geojsonURL\" class=\"form-control\">
                          <label for=\"geojsonURL\">geoJSON link</label>
                        </div>

                      </div>
                    </div>
                  </div>
                  <!-- Accordion card -->

                </div>
                <!-- Accordion wrapper -->

                <!-- Add button -->
                <button type=\"button\" id=\"addLayer\" class=\"btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0\" data-dismiss=\"modal\" aria-label=\"Close\">Add layer</button>

              <!--/form-->

            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</div>
`;








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
  * @param {callback} callObj The object containing all callback to be performed on the data
  * @param {callback} popupCall The callback that generates the popup content
  *
  * @throws An error if the layer type is not defined
  */
  this.addLayer = (hash, title, data, callObj, popupCall) => {

    let layer = L.geoJSON(data, callObj).bindPopup(popupCall).addTo(this.apimap);

    layer.options.id = hash;
    layer.options.type = "geojson";
    layer.options.title = title;

    this.layers.push(layer);

    let attribStr = `<span id=\"${hash}\">${title}</span>
                     &nbsp;&nbsp;
                     &nbsp;&nbsp;
                     <a class=\"px-2 fa-lg\"><i class=\"fa fa-trash\" id=\"layerDelete\" data-layerId=\"${hash}\"></i></a>
                     <!--a class=\"px-2 fa-lg\"><i class=\"fa fa-edit\" id=\"layerEdit\" data-layerId=\"${hash}\"></i></a-->`;

    this.mapControl.addOverlay(layer, attribStr);
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
