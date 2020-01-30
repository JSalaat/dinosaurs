import Dino from './Dino';
import { PIGEON } from '../constants';

export default class Bird extends Dino{

    /**
     * @description Represents a Bird extends Dino
     * @constructor
     * @param {string} weight - The weight of the specie
     * @param {string} height - The height of the specie
     * @param {string} diet - The diet of the specie
     * @param {string} fact - The name of the Bird
     */
    constructor(weight, height, diet, fact) {
        super(weight, height, diet, PIGEON, fact);
    }
}
