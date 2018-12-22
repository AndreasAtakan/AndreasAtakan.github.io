"use strict";

import {gfx} from "./gfx/gfx.js";
import {json} from "./helper/json.js";

console.info("Running in test mode");

let maingfx = new gfx($(`div#container`), 0, 5, 64, 13);
window.gfx = maingfx;







// Generating layer manually for testing purpose

// Directly accessing the map fields. This i s NOT how it should be done, just for testing perposes
let data = json,
    hash = maingfx.addLayer("Medlemmer");

for(var urld of data.result) {
  L.esri.Geocoding.geocode().address(urld.main_adddress).run((err, results, response) => {
    if(results && results.results) {
      let res = results.results[0];
      let markerId = maingfx.addMarker(res.latlng.lat, res.latlng.lng,
                                      `<h5>${urld.name}</h5>
                                        <p>
                                          type: ${urld.type} <br>
                                          description: ${urld.description} <br>
                                          <a href=\"${urld.website}\" target=\"_blank\">Nettsted</a>
                                        </p>`,
                                      hash);
    }
  });
}

/*
sources:
- http://esri.github.io/esri-leaflet/api-reference/tasks/geocode.html#methods
- https://github.com/Leaflet/Leaflet/issues/2049
- https://github.com/calvinmetcalf/leaflet-ajax



let title = "Medlemmer",
    url = "http://data.urbalurba.com/api/3/action/organization_list?all_fields=true&include_extras=true";

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
    }

  }else
    alert("Error: could not reach url");
});
*/
