console.info("Running in production mode");


let fBasemap = L.tileLayer("http://www.google.com/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
                          {
                            id: "0",
                            attribution: "&copy; <a href=\"https://www.google.com/\" target=\"_blank\">Google Maps</a> contributors"
                          });



let apiMap = L.map(`map`, {
  center: [25, -25],
  zoomControl: false,
  zoom: 3,
  layers: [fBasemap]
});

L.control.zoom({
  position: 'bottomleft'
}).addTo(apiMap);
