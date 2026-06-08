import * as Interface from "./interface";
import { type IVs, type Nature, type ShinyType, type Compatibility, type EggMethod } from "./interface";
import { getStates, advanceStates, generateEgg } from "./rng";
import { ivsEqual } from "./utils";

export type HeldFrameSearcherArgs = {
    seeds:          number[];
    pickupSeed:     number;
    pickupAdvances: number;
    minAdvances:    number;
    maxAdvances:    number;
    compatibility:  Compatibility;
    parentIVsA:     IVs;
    parentIVsB:     IVs;
    targetIVs:      IVs;
    targetNature:   Nature;
    targetShiny:    ShinyType;
    method:         EggMethod;
    tidxorsid:      number;
}

export default class HeldFrameSearcher implements Interface.HeldFrameSearcher {
    seeds:          number[];
    minAdvances:    number;
    maxAdvances:    number;
    compatibility:  Compatibility;
    parentIVsA:     IVs;
    parentIVsB:     IVs;
    targetIVs:      IVs;
    targetNature:   Nature;
    targetShiny:    ShinyType;
    tidxorsid:      bigint;
    method:         EggMethod;
    pickupSeed:     number;
    pickupAdvances: number;

    _pickupStates:  bigint[];
    _rngStates:     bigint[]            = [];
    _hits:          Interface.SearchResult[]  = [];

    constructor(
        { 
            seeds, pickupSeed, pickupAdvances,
            minAdvances, maxAdvances, 
            parentIVsA, parentIVsB, compatibility, 
            targetIVs, targetNature, targetShiny,
            method, tidxorsid 
        }: HeldFrameSearcherArgs
    ){
        this.seeds = seeds;
        this.pickupSeed = pickupSeed;
        this.pickupAdvances = pickupAdvances;

        this._pickupStates = getStates(pickupSeed, pickupAdvances, 16);

        this.minAdvances = minAdvances;
        this.maxAdvances = maxAdvances;
        this.compatibility = compatibility;
        this.parentIVsA = parentIVsA;
        this.parentIVsB = parentIVsB;
        this.targetIVs = targetIVs;
        this.targetNature = targetNature;
        this.targetShiny = targetShiny;
        this.tidxorsid = BigInt(tidxorsid);
        this.method = method;   
    }

    private checkForMatch(seed: number, advances: number): void {
        const eggResult = generateEgg(
            this._rngStates, this._pickupStates, 
            this.compatibility, this.parentIVsA, this.parentIVsB, 
            this.method, this.tidxorsid
        );
        let shinyMatch: boolean;
        if (this.targetShiny == "Any"){
            shinyMatch = true;
        }else if (this.targetShiny == "Star/Square"){
            shinyMatch = eggResult.shiny !== "Any"; 
        }else {
            shinyMatch = eggResult.shiny == this.targetShiny;
        }
        if (ivsEqual(eggResult.ivs, this.targetIVs) && (this.targetNature === eggResult.nature) && shinyMatch){
            this._hits.push({seed, advances, egg: eggResult});
        }
    }

    private searchSeed(seed: number): void {
        this._rngStates = getStates(seed, this.minAdvances, 16);
        for (let adv=this.minAdvances; adv<=this.maxAdvances; adv++){
            this.checkForMatch(seed, adv);
            advanceStates(this._rngStates);
        }
    }

    public search(): Interface.SearchResult[] {
        this._hits = [];
        for (const seed of this.seeds){
            this.searchSeed(seed);
        }
        return this._hits;
    }

}