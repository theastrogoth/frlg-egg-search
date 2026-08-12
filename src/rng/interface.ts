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
    gender: Gender,
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

export type Parents = {
    parentIVsA:      IVs;
    parentIVsB:      IVs;
    compatibility:   Compatibility;
    genderThreshold: number;
}

export type SearchTarget = {
    ivs:        IVs;
    nature:     Nature;
    ability:    number;
    gender:     Gender;
    shiny:      ShinyType;
    method:     EggMethod
}

export type SeedInfo = {
    seed:  number;
    delay: number;
}

export type SearchResult = {
    seed:           SeedInfo;
    advances:       number;
    egg:            EggInfo;
}

export interface PickupFrameSearcher {
    seeds:           number[];
    delays:          number[];
    minAdvances:     number;
    maxAdvances:     number;
    parents:         Parents;
    target:          SearchTarget;
    tidxorsid:       bigint;
}

export interface HeldFrameSearcher {
    seeds:           number[];
    delays:          number[];
    pickupSeed:      number;
    pickupAdvances:  number;
    minAdvances:     number;
    maxAdvances:     number;
    parents:         Parents;
    target:          SearchTarget;
    tidxorsid:       bigint;
}