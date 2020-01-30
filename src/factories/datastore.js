import { convertToInches } from "../helpers";
import { DINOS } from "../constants";

const datastore = {};
const tiles = [];

/**
 * @description set store for data
 */
const setStore = (dinoData, humanData) => {
    datastore.dinos = dinoData[DINOS];

    datastore.human = {
        name: humanData.name,
        weight: parseInt(humanData.weight),
        height: convertToInches(parseInt(humanData.feet), parseInt(humanData.inches)),
        diet: humanData.diet
    };
};

/**
 * @description returns the tiles arrays
 * @constructor
 * @return {Array} tiles - the tiles array
 */
const getTiles = () => {
    return tiles;
};

/**
 * @description returns the data store
 * @constructor
 * @return {Array} datastore
 */
const getStore = () => {
    return datastore;
};

export {
    setStore, getTiles, getStore
};
