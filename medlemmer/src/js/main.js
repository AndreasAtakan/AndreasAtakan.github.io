"use strict";

import {gfx} from "./gfx/gfx.js";

console.info("Running in test mode");

let maingfx = new gfx($(`div#container`), 0, 5, 64, 13);
window.gfx = maingfx;







// Generating layer manually for testing purpose

/* sources:
http://esri.github.io/esri-leaflet/api-reference/tasks/geocode.html#methods
https://github.com/Leaflet/Leaflet/issues/2049
https://github.com/calvinmetcalf/leaflet-ajax
*/

maingfx.addLayerFromURL("Medlemmer", "http://data.urbalurba.com/api/3/action/organization_list?all_fields=true&include_extras=true");
