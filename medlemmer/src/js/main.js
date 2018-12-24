"use strict";

import {gfx} from "./gfx/gfx.js";
import {json} from "./helper/json.js";

console.info("Running in test mode");

let maingfx = new gfx($(`div#container`), 0, 5, 64, 13);
window.gfx = maingfx;







// Generating layer manually for testing purpose

// Directly accessing the map fields. This i s NOT how it should be done, just for testing perposes
let url = "http://data.urbalurba.com/api/3/action/organization_list?all_fields=true&include_extras=true",
    title = "Medlemmer";

$.getJSON(url, (data, status) => {
  if(status == "success" && data.success) {
    let hash = maingfx.addLayer(title);

    for(let urld of data.result) {
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

  }else
    alert("Error: could not reach url");
});

/*
sources:
- http://esri.github.io/esri-leaflet/api-reference/tasks/geocode.html#methods
- https://github.com/Leaflet/Leaflet/issues/2049
- https://github.com/calvinmetcalf/leaflet-ajax



// json data formating
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
