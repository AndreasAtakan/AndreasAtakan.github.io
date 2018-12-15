"use strict";

export let addLayerModal = `
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
