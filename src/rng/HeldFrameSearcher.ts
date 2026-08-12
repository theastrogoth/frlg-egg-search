import * as Interface from "./interface";
import { type Parents, type SearchTarget } from "./interface";
import { getStates, advanceStates, generateEgg } from "./rng";
import { ivsEqual } from "./utils";

export type HeldFrameSearcherArgs = {
    seeds:          number[];
    delays:         number[];
    pickupSeed:     number;
    pickupAdvances: number;
    minAdvances:    number;
    maxAdvances:    number;
    parents:        Parents;
    target:         SearchTarget;
    tidxorsid:      number;
}

export default class HeldFrameSearcher implements Interface.HeldFrameSearcher {
    seeds:          number[];
    delays:         number[];
    pickupSeed:     number;
    pickupAdvances: number;
    minAdvances:    number;
    maxAdvances:    number;
    parents:        Parents;
    target:         SearchTarget;
    tidxorsid:      bigint;

    _pickupStates:  bigint[];
    _rngStates:     bigint[]            = [];
    _hits:          Interface.SearchResult[]  = [];

    constructor(
        { 
            seeds, delays,
            pickupSeed, pickupAdvances,
            minAdvances, maxAdvances, 
            parents, target, tidxorsid 
        }: HeldFrameSearcherArgs
    ){
        this.seeds = seeds;
        this.delays = delays;
        this.pickupSeed = pickupSeed;
        this.pickupAdvances = pickupAdvances;

        this._pickupStates = getStates(pickupSeed, pickupAdvances, 16);

        this.minAdvances = minAdvances;
        this.maxAdvances = maxAdvances;
        this.parents = parents;
        this.target  = target;
        this.tidxorsid = BigInt(tidxorsid);
    }

    private checkForMatch(seed: number, delay: number, advances: number): void {
        const eggResult = generateEgg(
            this._rngStates, this._pickupStates, 
            this.parents.compatibility, this.parents.parentIVsA, this.parents.parentIVsB, 
            this.target.method, this.parents.genderThreshold, this.tidxorsid
        );
        let shinyMatch: boolean;
        if (this.target.shiny === "Any"){
            shinyMatch = true;
        }else if (this.target.shiny == "Star/Square"){
            shinyMatch = eggResult.shiny !== "Any"; 
        }else {
            shinyMatch = eggResult.shiny === this.target.shiny;
        }

        if (shinyMatch &&
            ivsEqual(eggResult.ivs, this.target.ivs) &&
            (this.target.nature === eggResult.nature) &&
            ((this.target.ability < 0) || (this.target.ability === eggResult.ability)) &&
            ((this.target.gender === "Any") || (this.target.gender === eggResult.gender))
        ){
            this._hits.push({seed: { seed, delay }, advances, egg: eggResult});
        }
    }

    private searchSeed(index: number): void {
        const seed = this.seeds[index];
        const delay = this.delays[index];
        this._rngStates = getStates(seed, this.minAdvances, 16);
        for (let adv=this.minAdvances; adv<=this.maxAdvances; adv++){
            this.checkForMatch(seed, delay, adv);
            advanceStates(this._rngStates);
        }
    }

    public search(): Interface.SearchResult[] {
        this._hits = [];
        for (let i=0; i<this.seeds.length; i++){
            this.searchSeed(i);
        }
        return this._hits;
    }

}