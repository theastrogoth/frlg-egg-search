import * as Interface from "./interface";
import { type Parents, type SearchTarget } from "./interface";
import { getFront, getBack, shiftFront, getStates, advanceStates, natureFromPID, abilityFromPID, genderFromPID, generatePickupEgg } from "./rng";
import { ivsEqual } from "./utils";

export type PickupFrameSearcherArgs = {
    seeds:           number[];
    delays:          number[];
    minAdvances:     number;
    maxAdvances:     number;
    target:          SearchTarget;
    parents:         Parents;
    tidxorsid:       number;
}

export default class PickupFrameSearcher implements Interface.PickupFrameSearcher {
    seeds:           number[];
    delays:          number[];
    minAdvances:     number;
    maxAdvances:     number;
    parents:         Parents;
    target:          SearchTarget;
    tidxorsid:       bigint;

    _rngStates:     bigint[]            = [];
    _hits:          Interface.SearchResult[]  = [];

    constructor(
        { 
            seeds, delays,
            minAdvances, maxAdvances, 
            parents, target, tidxorsid 
        }: PickupFrameSearcherArgs
    ){
        this.seeds = seeds;
        this.delays = delays;
        this.minAdvances = minAdvances;
        this.maxAdvances = maxAdvances;
        this.parents = parents;
        this.target = target;
        this.tidxorsid = BigInt(tidxorsid);
    }

    private getShinyPIDs(pickupPID: bigint): bigint[] {
        const lo = BigInt.asUintN(32, 
            BigInt.asUintN(32, BigInt.asUintN(32, (this.tidxorsid ^ pickupPID) >> 3n) << 3n)
        );
        const heldPIDs = Array.from({length: 8}, (_, i) => lo + BigInt(i));
        return heldPIDs.map(hpid => BigInt.asUintN(32, shiftFront(pickupPID) + hpid));
    }

    private getSquarePID(pickupPID: bigint): bigint {
        const heldPID = this.tidxorsid ^ pickupPID;
        return BigInt.asUintN(32, shiftFront(pickupPID) + heldPID);
    }

    private checkForMatch(seed: number, delay: number, advances: number): void {
        let pickupResult = generatePickupEgg(
            this._rngStates, 0n, this.parents.parentIVsA, this.parents.parentIVsB, 
            this.target.method, this.parents.genderThreshold, this.tidxorsid
        );
        if (!ivsEqual(pickupResult.ivs, this.target.ivs)) { return; }
        if (this.target.shiny !== "Any"){
            const pickupPID = getFront(pickupResult.pid);
            let pids: bigint[];
            let sqpid: bigint;
            switch (this.target.shiny){
            case "Square":
                pids = [this.getSquarePID(pickupPID)];
                break;
            case "Star":
                sqpid = this.getSquarePID(pickupPID);
                pids = this.getShinyPIDs(pickupPID).filter(pid => pid !== sqpid);
                break;
            default:
                pids = this.getShinyPIDs(pickupPID);
            }

            pids = pids.filter(p => natureFromPID(p) === this.target.nature);
            if (this.target.gender !== "Any"){
                pids = pids.filter(p => genderFromPID(p, this.parents.genderThreshold) === this.target.gender);
            }
            if (this.target.ability >= 0){
                pids = pids.filter(p => abilityFromPID(p) === this.target.ability);
            }
            if (pids.length === 0){ return; }

            const finalPID = pids[0];
            pickupResult = generatePickupEgg(
                this._rngStates, getBack(finalPID), this.parents.parentIVsA, this.parents.parentIVsB, 
                this.target.method, this.parents.genderThreshold, this.tidxorsid
            );
        }
        this._hits.push({ seed: { seed, delay}, advances, egg: pickupResult });
    }

    private searchSeed(index: number){
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