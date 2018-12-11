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

                <br>

                <!-- geoJSON-source -->
                <div class=\"md-form\">
                  <p><b>geoJSON source-file:</b></p>
                  <div class="btn btn-primary btn-sm">
                    <input type="file" id="geojsonSource">
                  </div>
                </div>

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
