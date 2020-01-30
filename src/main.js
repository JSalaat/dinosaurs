import { domService, modelService } from './services/index';
import { setStore } from './factories/index';
import { fetchJSONData } from './helpers/index';
import { SUBMIT_BTN_ID, FORM_ID } from "./constants";

(() => {
    "use strict";

    /**
     * @description submit form action method
     */
    document.getElementById (SUBMIT_BTN_ID).addEventListener("click", () => {
        let humanData = domService.validateForm(document.forms[FORM_ID]);
        if (humanData) {
            fetchJSONData()
                .then((data) => {
                    setStore(data, humanData);
                    modelService.createDinos();
                    modelService.createHuman();
                    domService.hideForm();
                    domService.addTilesToDOM();
                });
        }
    }, false);


})();
