export default class Specie{

    /**
     * @description Represents a Specie
     * @constructor
     * @param {string} weight - The weight of the specie
     * @param {string} height - The height of the specie
     * @param {string} diet - The diet of the specie
     * @param {string} species - The classification of the specie
     */
    constructor(weight, height, diet, species){
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.species = species;
    }

}
