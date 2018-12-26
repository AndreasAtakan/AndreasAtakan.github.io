"use strict";

import {gfx} from "./gfx/gfx.js";
import {json} from "./helper/json.js";

console.info("Running in test mode");

let maingfx = new gfx($(`div#container`), 0, 5, 64, 13);





// Generating layer manually for testing purpose
let url = "http://data.urbalurba.com/api/3/action/organization_list?all_fields=true&include_extras=true",
    title = "Medlemmer";
let data = json,
    hash = maingfx.addLayer(title);

for(let urld of data.result) {
  if(urld.latlng.lat != 0 && urld.latlng.lng != 0) {
    let markerId = maingfx.addMarker(urld.latlng.lat, urld.latlng.lng,
                                    `<h5><a href=\"${urld.website}\" target=\"_blank\">${urld.display_name}</a></h5>
                                      <img src=\"${urld.image_url}\" alt=\"\" id=\"organization_logo\">
                                      <p><b>type</b>: ${urld.organization_type}</p>
                                      <p><b>beskrivelse</b>: ${urld.description}</p>
                                      <p>
                                        <b>Kontakt:</b> ${urld.contact_name} , ${urld.contact_title} <br>
                                                        <a href=\"tel:${urld.contact_mobile}\" target=\"_blank\">${urld.contact_mobile}</a> <br>
                                                        <a href=\"mailto:${urld.contact_email}\" target=\"_blank\">${urld.contact_email}</a>
                                      </p>`,
                                    hash);
  }
}

/*
$.getJSON(url, (data, status) => {
  if(status == "success" && data.success) {
    let hash = maingfx.addLayer(title);

    for(let urld of data.result) {
      L.esri.Geocoding.geocode().address(urld.main_adddress).run((err, results, response) => {
        if(results && results.results) {
          let res = results.results[0];
          let markerId = maingfx.addMarker(res.latlng.lat, res.latlng.lng,
                                          `<h5><a href=\"${urld.website}\" target=\"_blank\">${urld.display_name}</a></h5>
                                            <p><b>type</b>: ${urld.organization_type}</p>
                                            <p><b>beskrivelse</b>: ${urld.description}</p>
                                            <p>
                                              <b>Kontakt:</b> ${urld.contact_name} , ${urld.contact_title} <br>
                                                              <a href=\"tel:${urld.contact_mobile}\" target=\"_blank\">${urld.contact_mobile}</a> <br>
                                                              <a href=\"mailto:${urld.contact_email}\" target=\"_blank\">${urld.contact_email}</a>
                                            </p>`,
                                          hash);
        }else{
          console.log(urld.main_adddress);
        }
      });
    }

  }else
    alert("Error: could not reach url");
});
*/
