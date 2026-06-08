// Types for RNG stuff

export type Nature =
      "Hardy"  | "Lonely" | "Brave"   | "Adamant" | "Naughty"
    | "Bold"   | "Docile" | "Relaxed" | "Impish"  | "Lax" 
    | "Timid"  | "Hasty"  | "Serious" | "Jolly"   | "Naive"
    | "Modest" | "Mild"   | "Quiet"   | "Bashful" | "Rash"
    | "Calm"   | "Gentle" | "Sassy"   | "Careful" | "Quirky";

export const NATURES: Nature[] = [
    "Hardy", "Lonely", "Brave", "Adamant", "Naughty",
    "Bold", "Docile", "Relaxed", "Impish", "Lax",
    "Timid", "Hasty", "Serious", "Jolly", "Naive",
    "Modest", "Mild", "Quiet", "Bashful", "Rash",
    "Calm", "Gentle", "Sassy", "Careful", "Quirky"
];

export type Gender = "Any" | "Female" | "Male";

export type IVs       = [number, number, number, number, number, number];
export type BaseStats = [number, number, number, number, number, number];

export type ShinyType = "Any" | "Star" | "Square" | "Star/Square";

export type PokemonInfo = {
    pid: bigint,
    gender: number,
    nature: Nature,
    ability: number,
    ivs: IVs,
    shiny: ShinyType
};

export type EggInfo = PokemonInfo & {
    inheritance: IVs,
    method: EggMethod
}

export type Compatibility = "low" | "medium" | "high";

export type EggMethod = "normal" | "split" | "alternate" | "mixed";

// searchers

export type SearchResult = {
    seed:           number;
    advances:       number;
    egg:            EggInfo;
}

export interface PickupFrameSearcher {
    seeds:           number[];
    minAdvances:     number;
    maxAdvances:     number;
    parentIVsA:      IVs;
    parentIVsB:      IVs;
    targetIVs:       IVs;
    targetNature:    Nature;
    targetShiny:     ShinyType;
    method:          EggMethod;
    tidxorsid:       bigint;
}

export interface HeldFrameSearcher {
    seeds:           number[];
    pickupSeed:      number;
    pickupAdvances:  number;
    minAdvances:     number;
    maxAdvances:     number;
    compatibility:   Compatibility;
    parentIVsA:      IVs;
    parentIVsB:      IVs;
    targetIVs:       IVs;
    targetNature:    Nature;
    targetShiny:     ShinyType;
    method:          EggMethod;
    tidxorsid:       bigint;
}