sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
    function (Controller) {
        "use strict";

        return Controller.extend("com.sap.kpimodel.controller.App", {
            onInit: function () {

                this._mainModel = this.getOwnerComponent().getModel();

                const payload = {
                    "scenario": "GTP",
                    "key": "DIALOG_RESPONSE_TIME"
                };

                const username = "default\\team2207";
                const password = "Welcome2207";

                fetch('/app/pipeline-modeler/openapi/service/f88067f5-3e0e-4d04-8d37-bbd3b5e56705/v1/uploadjson',
                    {
                        method: 'POST', headers: {
                            'Content-Type': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                            "Authorization": 'Basic ' + btoa(username + ":" + password)
                        },
                        body: JSON.stringify(payload)
                    })
                    .then(response => response.json())
                    .then(data => {
                        let modifiedData = data.KPIs.map((kpi) => ({ name: kpi }));
                        modifiedData = {"KPIs": modifiedData};
                        console.log(modifiedData);

                        this._mainModel.setProperty("/", modifiedData);
                    });

            }
        });
    });
