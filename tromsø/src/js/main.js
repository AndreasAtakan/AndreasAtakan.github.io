"use strict";

import {gfx} from "./gfx/gfx.js";

console.info("Running in test mode");

let maingfx = new gfx($(`div#container`), 0, 10, 69.6489, 18.95508);
maingfx.init();







/*
  Generating layer manually for testing purpose
*/


// Snarveier i Tromsø kommune
maingfx.addLayerFrom("url", "Snarveier", {}, (layer) => {
  return `
      <h5>${layer.feature.properties.Dekke}</h5>
      <p>
        Belysning: ${layer.feature.properties.Belysning} <br>
        Synlighet: ${layer.feature.properties.Synlighet} <br>
        Creator: ${layer.feature.properties.Creator}
      </p>`;
},"https://data-tromso.opendata.arcgis.com/datasets/b792b1e7b627463aba410ecc0bf21e3e_0.geojson");






// Utfartsparkering i Tromsø kommune
maingfx.addLayerFrom("url", "Utfartsparkering", {}, (layer) => {
  return `
      <h5>${layer.feature.properties.Navn}</h5>
      <p>
        Kommentar: ${layer.feature.properties.Kommentar}
      </p>`;
},"https://data-tromso.opendata.arcgis.com/datasets/3d9b877e2b3e4718943fe7484ed7d6d0_6.geojson");






// Skiløyper i Tromsø kommune
maingfx.addLayerFrom("url", "Skiløyper", {}, (layer) => {
  return `
      <h5>${layer.feature.properties.NAVN}</h5>
      <p>
        Type: ${layer.feature.properties.TYPE_}
      </p>`;
},"https://data-tromso.opendata.arcgis.com/datasets/3d9b877e2b3e4718943fe7484ed7d6d0_7.geojson");






// Skoler i Tromsø kommune
maingfx.addLayerFrom("url", "Skoler", {}, (layer) => {
  return `
      <h5>${layer.feature.properties.SKOLENAVN}</h5>
      <p>
        Byggningstype: ${layer.feature.properties.OBJTYPE} <br>
        Type: ${layer.feature.properties.SKOLETYPE}
      </p>`;
},"https://data-tromso.opendata.arcgis.com/datasets/4fbe853b302d4a77b077e4c92082dd7f_1.geojson");






// Barnehager  i Tromsø kommune
maingfx.addLayerFrom("url", "Barnehager ", {}, (layer) => {
  return `
      <h5>${layer.feature.properties.NAVN}</h5>
      <p>
        Byggningstype: ${layer.feature.properties.OBJTYPE} <br>
        Type: ${layer.feature.properties.TYPE} <br>
        <a href=\"${layer.feature.properties.URL}\" target=\"_blank\">Nettsted</a>
      </p>`;
},"https://data-tromso.opendata.arcgis.com/datasets/2613ce0bcac44ec0a41707af449008a2_0.geojson");
