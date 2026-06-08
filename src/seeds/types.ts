// Types for search inputs

export type GameVersion = "FireRed" | "LeafGreen";
export type Language = "ENG/SPA/FRE/ITA/GER" | "JPN";

export type SeedSettings = "Mono / Help / A" | "Stereo / Help / A" | "Mono / Help / START";

export type SeedSheetData = {
    settings: string[];
    seeds: string[][];
}