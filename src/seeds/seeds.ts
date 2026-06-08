import FR_ENG_SHEET from '../assets/fr_eng_nx.json';
import LG_ENG_SHEET from '../assets/lg_eng_nx.json';
import FR_JPN_SHEET from '../assets/fr_jpn_nx.json';
import LG_JPN_SHEET from '../assets/lg_jpn_nx.json';
import type { SeedSettings, SeedSheetData } from './types';

function sheet_to_data(sheet: object): SeedSheetData {
    const settings: SeedSettings[] = [];
    const seeds: string[][] = [];
    for (const key in sheet){
        settings.push(key as SeedSettings);
        // @ts-expect-error don't want to actually figure out the right way to do this
        seeds.push(sheet[key]);
    }
    return { settings, seeds };
}

export const FR_ENG_SEEDS = sheet_to_data(FR_ENG_SHEET);
export const LG_ENG_SEEDS = sheet_to_data(LG_ENG_SHEET);
export const FR_JPN_SEEDS = sheet_to_data(FR_JPN_SHEET);
export const LG_JPN_SEEDS = sheet_to_data(LG_JPN_SHEET);
