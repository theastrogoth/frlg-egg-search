import { type Nature, type PokemonInfo, type IVs, type ShinyType, type Compatibility, type EggMethod, type EggInfo, NATURES } from "./interface";


// manipulating BigInts

export function getFront(state: bigint): bigint {
    return BigInt.asUintN(16, state >> 16n);
}

export function getBack(state: bigint): bigint {
    return BigInt.asUintN(16, state & 0xffffn);
}

export function trimBack(state: bigint): bigint {
    return BigInt.asUintN(32, state & 0xffff0000n);
}

export function shiftFront(state: bigint): bigint {
    return BigInt.asUintN(32, state << 16n);
}

// Random number generator, Gen 3 //

const MULTIPLIER = BigInt(0x41c64e6d);
const INCREMENT = BigInt(0x6073);

export function advanceState(state: bigint): bigint {
    return BigInt.asUintN(32, MULTIPLIER * state + INCREMENT);
}

export function advanceStateBy(state: bigint, steps: number): bigint {
    let currentState = state;
    for (let i = 0; i < steps; i++) {
        currentState = advanceState(currentState);
    }
    return currentState;
}

export function advanceStates(states: bigint[]): void {
    // this mutates the existing array
    for (let i = 0; i < states.length - 1; i++) {
        states[i] = states[i + 1];
    }
    states[states.length-1] = advanceState(states[states.length - 1]);
}

export function getStates(seed: number, advances: number, len: number): bigint[] {
    const states  = new Array(len).fill(0n);
    states[0] = advanceStateBy(BigInt(seed), advances + 1);
    for (let i=1; i<len; i++){
        states[i] = advanceState(states[i-1]);
    }
    return states;
}

// Pokemon generation //

function generatePID(state1: bigint, state2: bigint): bigint {
    return trimBack(state2) + getFront(state1);
}

function genderFromPID(pid: bigint): number {
    return Number(pid && 0xffn);
}

export function natureFromPID(pid: bigint): Nature {
    return NATURES[Number(pid % 25n)];
}

function abilityFromPID(pid: bigint): number {
    return Number(pid % 2n);
}

function shinyFromPID(pid: bigint, tidxorsid: bigint): ShinyType {
    const shinyValue = (getFront(pid) ^ getBack(pid)) ^ tidxorsid;
    if (shinyValue === 0n) {
        return "Square";
    } else if (shinyValue < 8) {
        return "Star";
    } else {
        return "Any";
    }
}

function generateIV(state: bigint): [number, number, number] {
    const ivs: [number, number, number] = [0, 0, 0];
    let remaining = getFront(state);
    ivs[0] = Number(BigInt.asUintN(16, remaining & 0x1fn));
    remaining = BigInt.asUintN(16, remaining >> 5n);
    ivs[1] = Number(BigInt.asUintN(16, remaining & 0x1fn));
    remaining = BigInt.asUintN(16, remaining >> 5n);
    ivs[2] = Number(BigInt.asUintN(16, remaining & 0x1fn));
    return ivs;
}

export function generatePokemon(states: bigint[], tidxorsid: bigint): PokemonInfo {
    const pid = generatePID(states[0], states[1]);
    const gender = genderFromPID(pid);
    const nature = natureFromPID(pid);
    const ability = abilityFromPID(pid);
    const ivs1 = generateIV(states[3]);
    const ivs2 = generateIV(states[4]);
    const ivs: IVs = [ivs1[0], ivs1[1], ivs1[2], ivs2[1], ivs2[2], ivs2[0]];
    const shiny = shinyFromPID(pid, tidxorsid);
    return { pid, gender, nature, ability, ivs, shiny };
}

// Egg generation // 

const COMPATIBILITIES = [20, 50, 70];

function isHeld(state: bigint, compatibility: Compatibility): boolean {
    const compval = COMPATIBILITIES[compatibility === "low" ? 0 : compatibility === "medium" ? 1 : 2];
    return ((getFront(state) * 100n) / 0xfffn) < compval;
}

function getInheritedIVs(states: bigint[], startingidx: number): IVs {
    if (startingidx < 0 || startingidx > states.length - 5) {
        throw new Error("Invalid starting index for inherited IVs");
    }
    const inherited = [
        Number(getFront(states[startingidx    ]) % 6n),
        Number(getFront(states[startingidx + 1]) % 5n),
        Number(getFront(states[startingidx + 2]) % 4n)
    ];
    const parent: [number, number, number] = [
        Number(getFront(states[startingidx + 3]) % 2n),
        Number(getFront(states[startingidx + 4]) % 2n),
        Number(getFront(states[startingidx + 5]) % 2n)
    ];

    const order = [0, 1, 2, 5, 3, 4];
    const available = [0, 1, 2, 3, 4, 5];

    const inheritance: IVs = [0, 0, 0, 0, 0, 0];

    let stat = available[inherited[0]];
    inheritance[order[stat]] = parent[0] + 1;
    available.splice(stat, 1);

    stat = available[inherited[1]];
    inheritance[order[stat]] = parent[1] + 1;
    if (stat < 5) {
        available.splice(stat, 1);
    }

    stat = available[inherited[2]];
    inheritance[order[stat]] = parent[2] + 1;

    return inheritance;
}

function generateHeldPID(state1: bigint, state2: bigint, compatibility: Compatibility): bigint {
    if (!isHeld(state1, compatibility)) {
        return -1n;
    }
    return getFront(state2) % 0xfffen + 1n;
}

function getAdvancesFromEggMethod(method: EggMethod): [number, number, number] {
    // first IV group, second IV group, Inheritance
    switch (method) {
        case "normal":
            return [2, 1, 2];
        case "split":
            return [1, 2, 2];
        case "alternate":
            return [2, 1, 3];
        case "mixed":
            return [1, 1, 3];
    }
}

export function generatePickupEgg(states: bigint[], heldPID: bigint, parentIVsA: IVs, parentIVsB: IVs, method: EggMethod, tidxorsid: bigint): EggInfo {
    const pid = trimBack(states[0]) + heldPID;
    let currentStateIdx = 0; 
    const advances = getAdvancesFromEggMethod(method);

    currentStateIdx += advances[0];
    const ivs1 = generateIV(states[currentStateIdx]);
    currentStateIdx += advances[1];
    const ivs2 = generateIV(states[currentStateIdx]);
    const ivs: IVs = [ivs1[0], ivs1[1], ivs1[2], ivs2[1], ivs2[2], ivs2[0]];

    currentStateIdx += advances[2];
    const inheritance = getInheritedIVs(states, currentStateIdx);
    for (let i = 0; i < 6; i++) {
        const parent = inheritance[i];
        if (parent === 1) {
            ivs[i] = parentIVsA[i];
        } else if (parent === 2) {
            ivs[i] = parentIVsB[i];
        }
    }

    return { pid, 
             gender: genderFromPID(pid), 
             nature: natureFromPID(pid), 
             ability: abilityFromPID(pid), 
             ivs, 
             shiny: shinyFromPID(pid, tidxorsid), 
             inheritance,
             method
    };
}

export function generateEgg(
    held_states: bigint[], pickup_states: bigint[],
    compatibility: Compatibility, parentIVsA: IVs, parentIVsB: IVs, 
    method: EggMethod, tidxorsid: bigint): EggInfo
{
    const heldPID = generateHeldPID(held_states[0], held_states[1], compatibility);
    return generatePickupEgg(pickup_states, heldPID, parentIVsA, parentIVsB, method, tidxorsid);
}