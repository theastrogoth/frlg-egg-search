import * as Interface from "./interface";
import { type IVs, type Nature, type ShinyType, type EggMethod } from "./interface";
import { getFront, shiftFront, getStates, advanceStates, natureFromPID, generatePickupEgg } from "./rng";
import { ivsEqual } from "./utils";

export type PickupFrameSearcherArgs = {
    seeds:          number[];
    minAdvances:    number;
    maxAdvances:    number;
    parentIVsA:     IVs;
    parentIVsB:     IVs;
    targetIVs:      IVs;
    targetNature:   Nature;
    targetShiny:    ShinyType;
    method:         EggMethod;
    tidxorsid:      number;
}

export default class PickupFrameSearcher implements Interface.PickupFrameSearcher {
    seeds:          number[];
    minAdvances:    number;
    maxAdvances:    number;
    parentIVsA:     IVs;
    parentIVsB:     IVs;
    targetIVs:      IVs;
    targetNature:   Nature;
    targetShiny:    ShinyType;
    method:         EggMethod;
    tidxorsid:      bigint;

    _rngStates:     bigint[]            = [];
    _hits:          Interface.SearchResult[]  = [];

    constructor(
        { 
            seeds, minAdvances, maxAdvances, 
            parentIVsA, parentIVsB, targetIVs,
            targetNature, targetShiny,
            method, tidxorsid 
        }: PickupFrameSearcherArgs
    ){
        this.seeds = seeds;
        this.minAdvances = minAdvances;
        this.maxAdvances = maxAdvances;
        this.parentIVsA = parentIVsA;
        this.parentIVsB = parentIVsB;
        this.targetIVs = targetIVs;
        this.targetNature = targetNature;
        this.targetShiny = targetShiny;
        this.method = method;
        this.tidxorsid = BigInt(tidxorsid);
    }

    private getShinyHeldPIDs(pickupPID: bigint): bigint[] {
        const lo = BigInt.asUintN(32, 
            BigInt.asUintN(32, BigInt.asUintN(32, (this.tidxorsid ^ pickupPID) >> 3n) << 3n)
        );
        const pids = Array.from({length: 8}, (_, i) => lo + BigInt(i));
        return pids;
    }

    private getSquareHeldPID(pickupPID: bigint): bigint {
        return this.tidxorsid ^ pickupPID;
    }

    private getShinyNatures(pickupPID: bigint): Nature[] {
        const heldPIDs = this.getShinyHeldPIDs(pickupPID);
        return heldPIDs.map((p) => natureFromPID(shiftFront(pickupPID) + p));
    }

    private getSquareNature(pickupPID: bigint): Nature {
        return natureFromPID(shiftFront(pickupPID) + this.getSquareHeldPID(pickupPID));
    }

    private checkForMatch(seed: number, advances: number): void {
        const pickupResult = generatePickupEgg(this._rngStates, 0n, this.parentIVsA, this.parentIVsB, this.method, this.tidxorsid);
        const pickupPID = getFront(pickupResult.pid);
        let natureMatch: boolean;
        if (this.targetShiny == "Any"){
            natureMatch = true;
        }else if (this.targetShiny == "Star/Square"){
            natureMatch = this.getShinyNatures(pickupPID).includes(this.targetNature);
        }else if (this.targetShiny == "Square"){
            natureMatch = this.getSquareNature(pickupPID) === this.targetNature;
        }else { // if (this.targetShiny == "Star"){
            natureMatch = (
                   this.getShinyNatures(pickupPID).includes(this.targetNature)
                && this.getSquareNature(pickupPID) !== this.targetNature
            );
        }
        if (ivsEqual(pickupResult.ivs, this.targetIVs) && natureMatch){
            this._hits.push({ seed, advances, egg: pickupResult });
        }
    }

    private searchSeed(seed: number){
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