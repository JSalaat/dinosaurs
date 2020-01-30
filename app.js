(function () {
    "use strict";

    var HUMAN = "human";
    var PIGEON = "Pigeon";
    var DINOS = "dinos";
    var INCHES_IN_FT = 12;
    var dataStore = {};
    var tiles = [];

    /**
     * @description Represents a Specie
     * @constructor
     * @param {string} weight - The weight of the specie
     * @param {string} height - The height of the specie
     * @param {string} diet - The diet of the specie
     * @param {string} species - The classification of the specie
     */
    function Specie (weight, height, diet, species){
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.species = species;
    }

    /**
     * @description Represents a Dino extends Specie
     * @constructor
     * @param {string} weight - The weight of the specie
     * @param {string} height - The height of the specie
     * @param {string} diet - The diet of the specie
     * @param {string} species - The classification of the specie
     * @param {string} fact - The fact of the dino
     */
    function Dino (weight, height, diet, species, fact) {
        Specie.call(this, weight, height, diet, species);
        this.facts = [fact];
    }

    /**
     * @description Compare a Dino weight to human
     * @param {int} wHuman - The weight of the human
     */
    Dino.prototype.compareWeight = function (wHuman) {
        var wFact = "In terms of Weight, ";
        var W_LIMIT = 100;
        if (wHuman > this.weight + W_LIMIT) {
            wFact += "You're much heavier than " + this.species + ". You're like a human Dino!";
        } else if (wHuman > this.weight) {
            wFact += "You're heavier than " + this.species + ".";
        } else if (wHuman === this.weight) {
            wFact += "You and " + this.species + " weigh the same";
        } else if (wHuman < this.weight + W_LIMIT) {
            wFact += "You're much lighter than " + this.species + ". You're no match with " + this.species;
        } else if (wHuman < this.weight) {
            wFact += "You're much lighter than " + this.species + ".";
        }
        this.facts.push(wFact);
    };

    /**
     * @description Compare a Dino height to height
     * @param {int} hHuman - The height of the human
     */
    Dino.prototype.compareHeight = function (hHuman) {
        var hFact = "In terms of Height, ";
        var H_LIMIT = 200;
        if (hHuman > this.height + H_LIMIT) {
            hFact += "You're much taller than " + this.species + ". You're like a human Dino!";
        } else if (hHuman > this.height) {
            hFact += "You're taller than " + this.species + ".";
        } else if (hHuman === this.height) {
            hFact += "You and " + this.species + " are equally tall.";
        } else if (hHuman < this.height + H_LIMIT) {
            hFact += "You're much shorter than " + this.species + ". You're no match with " + this.species;
        } else if (hHuman < this.height) {
            hFact += "You're much shorter than " + this.species + ".";
        }
        this.facts.push(hFact);
    };


    /**
     * @description Compare a Dino Diet to height
     * @param {string} dHuman - The Diet of the human
     */
    Dino.prototype.compareDiet = function (dHuman) {
        var dFact = "In terms of Diet, ";
        if (dHuman !== this.diet) {
            dFact += "You're " + dHuman + ", while " + this.species + " are " + this.diet + ".";
        } else {
            dFact += "You and " + this.species + " eat the same food!";
        }
        this.facts.push(dFact);
    };

    /**
     * @description Represents a Human extends Specie
     * @constructor
     * @param {string} weight - The weight of the specie
     * @param {string} height - The height of the specie
     * @param {string} diet - The diet of the specie
     * @param {string} name - The name of the Human
     */
    function Human (weight, height, diet, name) {
        Specie.call(this, weight, height, diet, HUMAN);
        this.name = name;
    }

    /**
     * @description Represents a Bird extends Dino
     * @constructor
     * @param {string} weight - The weight of the specie
     * @param {string} height - The height of the specie
     * @param {string} diet - The diet of the specie
     * @param {string} fact - The name of the Bird
     */
    function Bird (weight, height, diet, fact) {
        Dino.call(this, weight, height, diet, PIGEON, fact);
    }

    /**
     * @description Create Dinos and push to tiles
     */
    var createDinos = function(){
        dataStore[DINOS].forEach(function (obj) {
            if (obj.species === "Pigeon") {
                var bird = new Bird(obj.weight, obj.height, obj.diet, obj.fact);
                tiles.push(bird);
            } else {
                var dino = new Dino(obj.weight, obj.height, obj.diet, obj.species, obj.fact);
                dino.compareWeight(dataStore.human.weight);
                dino.compareHeight(dataStore.human.height);
                dino.compareDiet(dataStore.human.diet);
                tiles.push(dino);
            }
        });
    };

    /**
     * @description Create a human object and set in the center of tiles
     */
    var createHuman = function(){
        var human = new Human(dataStore.human.weight, dataStore.human.height,
            dataStore.human.diet, dataStore.human.name);

        // insert into the middle
        tiles.splice(4, 0, human);
    };


    /**
     * @description Add tiles HTML to DOM
     */
    var addTilesToDOM = function () {
        var gridItems = "";
        var gridElm = document.getElementById("grid");
        tiles.forEach(function (item, index) {
            var randomIndex = item.facts && Math.floor(Math.random()*item.facts.length);
            var itemElm = '<div class="grid-item" data-key="'+index+'">' +
                '<img src="images/' + item.species + '.png" alt="" />' +
                '<h3>'+ (item.name ? item.name : item.species) + '</h3>' +
                getFact(item, randomIndex) +
                overlayMoreFacts(item, randomIndex) +
                '</div>';
            gridItems += itemElm;
        });
        gridElm.innerHTML = gridItems;

        function getFact(item, randomIndex) {
            return item.facts ? ("<p>• "+ item.facts[randomIndex] + "</p>") : "";
        }

        function overlayMoreFacts(item, randomIndex) {
            return item.facts && item.facts.length > 1 ? "<span class=\"overlay\">• " +
                item.facts.filter(function (fact, indx) {
                    return indx !== randomIndex;
                }).join("<br/>• ") + "</span>" : "";
        }
    };


    /**
     * @description Hide form from the DOM
     */
    var hideForm = function () {
        var formElm = document.getElementById("dino-compare");
        formElm.classList.add("hidden");
    };

    /**
     * @description Validate input from the from nd sets prepares human data
     * @return {Object} human data object
     */
    var validateForm = function (formEl) {
        // error message
        var errorText = "";
        var humanData = {};

        //check for input values and prepare error message
        for (var i = 0; i < formEl.length; i++) {
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
        var errorMessageElm = document.getElementById("error-message");
        if (errorText) {
            errorMessageElm.innerHTML = errorText;
            errorMessageElm.classList.remove("hidden");
        } else {
            errorMessageElm.classList.add("hidden");
            return humanData;
        }
    };

    /**
     * @description helper to convert ft and inches to inches only
     * @return {int} height in inches
     */
    var convertToInches = function (ft, inches) {
        return (ft*INCHES_IN_FT) + inches;
    };

    /**
     * @description set store for data
     */
    var setStore = function (dinoData, humanData) {
        dataStore.dinos = dinoData[DINOS];
        dataStore.human = {
            name: humanData.name,
            weight: parseInt(humanData.weight),
            height: convertToInches(parseInt(humanData.feet), parseInt(humanData.inches)),
            diet: humanData.diet
        };
    };

    /**
     * @description fetch dino json then return data
     * @return {promise} response object
     */
    var fetchJSONData = function(){
        return fetch("dino.json")
            .then(function (response) {
                // return if problem
                if (response.status !== 200) {
                    throw new Error("Looks like there was a problem. Status Code: " +
                        response.status);
                }
                return response.json();
            })
            .catch(function(err) {
                throw new Error(err);
            });
    };

    /**
     * @description init app on submit form action
     */

    document.getElementById ("comparebtn").addEventListener("click", () => {
        let humanData = validateForm(document.forms["dino-compare"]);
        if (humanData) {
            fetchJSONData()
                .then(function(data) {
                    setStore(data, humanData);
                    createDinos();
                    createHuman();
                    hideForm();
                    addTilesToDOM();
                });
        }
    }, false);

})();

// Comment: Could load JSON with good old XML, but fetch is much cleaner
//
// var data = {};
// function loadJSON(callback) {
//     var xobj = new XMLHttpRequest();
//     xobj.overrideMimeType('application/json');
//     xobj.open('GET', 'dino.json', true);
//     xobj.onreadystatechange = function () {
//         if (xobj.readyState === 4 && xobj.status === 200) {
//             // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
//             data = callback(xobj.responseText);
//             generateGridItems();
//         }
//     };
//     xobj.send(null);
// }
// loadJSON(function (data) {
//     return JSON.parse(data)['Dinos'];
//
// });
