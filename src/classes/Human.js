import Specie from './Specie';
import {HUMAN} from '../constants';

export default class Human extends Specie{

    /**
     * @description Represents a Human extends Specie
     * @constructor
     * @param {string} weight - The weight of the specie
     * @param {string} height - The height of the specie
     * @param {string} diet - The diet of the specie
     * @param {string} name - The name of the Human
     */
    constructor (weight, height, diet, name) {
        super(weight, height, diet, HUMAN);
        this.name = name;
    }
}
