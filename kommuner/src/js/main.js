"use strict";

import {gfx} from "./gfx/gfx.js";
import {geojson} from "./helper/geojson.js";

console.info("Running in test mode");

let maingfx = new gfx($(`div#container`), 0, 5, 64, 13);







/*
  Generating layer manually for testing purpose
*/

maingfx.addLayer("Medlemmer", geojson, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(`<h5>${layer.feature.properties.Navn}</h5>
                     <p>
                        Innbyggertall: ${layer.feature.properties.Innbyggertall} <br>
                        Område: ${layer.feature.properties["Område"]} <br>
                        <a href=\"${layer.feature.properties.Nettsted}\" target=\"_blank\">Nettsted</a>
                     </p>`);
  }
});
