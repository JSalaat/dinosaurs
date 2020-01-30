import Specie from './Specie';

export default class Dino extends Specie{

    /**
     * @description Represents a Dino extends Specie
     * @constructor
     * @param {string} weight - The weight of the specie
     * @param {string} height - The height of the specie
     * @param {string} diet - The diet of the specie
     * @param {string} species - The classification of the specie
     * @param {string} fact - The fact of the dino
     */
    constructor(weight, height, diet, species, fact) {
        super(weight, height, diet, species);
        this.facts = [fact];
    }

    /**
     * @description Compare a Dino weight to human
     * @param {int} wHuman - The weight of the human
     */
    compareWeight(wHuman) {
        let wFact = `In terms of Weight, `;
        const W_LIMIT = 100;
        if (wHuman > this.weight + W_LIMIT) {
            wFact += `You're much heavier than ${this.species}. You're like a human Dino!`;
        } else if (wHuman > this.weight) {
            wFact += `You're heavier than ${this.species}.`;
        } else if (wHuman === this.weight) {
            wFact += `You and ${this.species} weigh the same`;
        } else if (wHuman < this.weight + W_LIMIT) {
            wFact += `You're much lighter than ${this.species}. You're no match with ${this.species}`;
        } else if (wHuman < this.weight) {
            wFact += `You're much lighter than ${this.species}.`;
        }
        this.facts.push(wFact);
    }

    /**
     * @description Compare a Dino height to height
     * @param {int} hHuman - The height of the human
     */
    compareHeight(hHuman) {
        let hFact = `In terms of Height, `;
        const H_LIMIT = 200;
        if (hHuman > this.height + H_LIMIT) {
            hFact += `You're much taller than ${this.species}. You're like a human Dino!`;
        } else if (hHuman > this.height) {
            hFact += `You're taller than ${this.species}.`;
        } else if (hHuman === this.height) {
            hFact += `You and ${this.species} are equally tall.`;
        } else if (hHuman < this.height + H_LIMIT) {
            hFact += `You're much shorter than ${this.species}. You're no match with ${this.species}`;
        } else if (hHuman < this.height) {
            hFact += `You're much shorter than ${this.species}.`;
        }
        this.facts.push(hFact);
    }


    /**
     * @description Compare a Dino Diet to height
     * @param {string} dHuman - The Diet of the human
     */
    compareDiet(dHuman) {
        let dFact = `In terms of Diet, `;
        if (dHuman !== this.diet) {
            dFact += `You're ${dHuman}, while ${this.species} are ${this.diet}.`;
        } else {
            dFact += `You and ${this.species} eat the same food!`;
        }
        this.facts.push(dFact);
    }

}
