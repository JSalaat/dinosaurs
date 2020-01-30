import { getTiles } from "../factories";
import { FORM_ID, GRID_ID, HIDDEN } from "../constants";

let tiles = getTiles();

/**
 * @description Add tiles HTML to DOM
 */
const addTilesToDOM = () => {
    let gridItems = "";
    let gridElm = document.getElementById(GRID_ID);
    tiles.forEach((item, index) => {
        let randomIndex = item.facts && Math.floor(Math.random()*item.facts.length);
        let itemElm = '<div class="grid-item" data-key="'+index+'">' +
            '<img src="images/' + item.species + '.png" alt="" />' +
            '<h3>'+ (item.name ? item.name : item.species) + '</h3>' +
            getFact(item, randomIndex) +
            overlayMoreFacts(item, randomIndex) +
            '</div>';
        gridItems += itemElm;
    });
    gridElm.innerHTML = gridItems;

    function getFact (item, randomIndex){
        return item.facts ? ("<p>• "+ item.facts[randomIndex] + "</p>") : "";
    }

    function overlayMoreFacts (item, randomIndex) {
        return item.facts && item.facts.length > 1 ? "<span class=\"overlay\">• " +
            item.facts.filter((fact, indx) => {
                return indx !== randomIndex;
            }).join("<br/>• ") + "</span>" : "";
    }
};


/**
 * @description Hide form from the DOM
 */
const hideForm = () => {
    let formElm = document.getElementById(FORM_ID);
    formElm.classList.add(HIDDEN);
};

/**
 * @description Validate input from the from nd sets prepares human data
 * @return {Object} human data object
 */
const validateForm = (formEl)  => {
    // error message
    let errorText = "";
    let humanData = {};

    //check for input values and prepare error message
    for (let i = 0; i < formEl.length; i++) {
        if (!formEl[i].value) {
            formEl[i].classList.add("input-error");
            errorText = formEl[i].name + " field is required.";
            break;
        } else {
            formEl[i].classList.remove("input-error");
            humanData[formEl[i].id] = formEl[i].value;
        }
    }

    //set message if error
    let errorMessageElm = document.getElementById("error-message");
    if (errorText) {
        errorMessageElm.innerHTML = errorText;
        errorMessageElm.classList.remove(HIDDEN);
    } else {
        errorMessageElm.classList.add(HIDDEN);
        return humanData;
    }
};

export default {
    addTilesToDOM, hideForm, validateForm
};
