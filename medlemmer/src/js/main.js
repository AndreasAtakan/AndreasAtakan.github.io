"use strict";

import {Map} from "./map/Map.js";

console.info("Running in test mode");

var mainmap = new Map("container", 5, 64, 13);








var url = "http://data.urbalurba.com/api/3/action/organization_list?all_fields=true&include_extras=true",
    title = "Medlemmer";
var hash = mainmap.addLayer(title);

$.getJSON(url, (data, status) => {
  if(status == "success" && data.success) {

    for(var urld of data.result) {
      if(urld.locationData) {
        var latlng = JSON.parse(urld.locationData.replace(/\'/g, "\""));
        var markerId = mainmap.addMarker(latlng.latlng.lat, latlng.latlng.lng,
                                        `<h5><a href=\"${urld.website}\" target=\"_blank\">${urld.display_name}</a></h5>
                                          <img src=\"${urld.image_url}\" alt=\"\" id=\"organization_logo\">
                                          <p><b>type</b>: ${urld.organization_type}</p>
                                          <p><b>beskrivelse</b>: ${urld.description}</p>
                                          <p>
                                            <b>Kontakt:</b> ${urld.contact_name} , ${urld.contact_title} <br>
                                                            <a href=\"tel:${urld.contact_mobile}\" target=\"_blank\">${urld.contact_mobile}</a> <br>
                                                            <a href=\"mailto:${urld.contact_email}\" target=\"_blank\">${urld.contact_email}</a>
                                          </p>`,
                                        "https://image.flaticon.com/icons/svg/33/33622.svg", [hash]);
      }
    }

  }else
    alert("Error: could not reach url");
});
