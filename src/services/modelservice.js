import { Bird, Dino, Human } from "../classes";
import { DINOS, PIGEON } from "../constants";
import { getStore, getTiles } from "../factories";
import { shuffleArray } from "../helpers";


let dataStore = getStore();
let tiles = getTiles();

/**
 * @description Create Dinos and push to tiles
 */
const createDinos = () => {
    dataStore[DINOS].forEach((obj) => {
        if (obj.species === PIGEON) {
            let bird = new Bird(obj.weight, obj.height, obj.diet, obj.fact);
            tiles.push(bird);
        } else {
            let dino = new Dino(obj.weight, obj.height, obj.diet, obj.species, obj.fact);
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
const createHuman = () => {
    let human = new Human(dataStore.human.weight, dataStore.human.height,
        dataStore.human.diet, dataStore.human.name);

    // shuffle the tiles
    shuffleArray(tiles);

    // insert human into the middle
    tiles.splice(4, 0, human);
};

export default {
    createDinos, createHuman
};
