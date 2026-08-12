
import React from 'react';
import Box from '@mui/material/Box';;
import Stack from '@mui/material/Stack';

import GameSettings from './components/GameSettings';
import SaveSettings from './components/SaveSettings';
import SeedSettings from './components/SeedSettings';
import ParentSettings, { type ParentSettingsProps } from './components/ParentSettings';
import TargetSettings, { type TargetSettingsProps } from './components/TargetSettings';
import AdvancesInput from './components/AdvancesInput';
import PickupFrameInput from './components/PickupFrameInput';
import HeldSearchButton from './components/HeldSearchButton';
import ResultsDisplay from './components/ResultsDisplay';

import { type SearchResult } from './rng/interface';
import type { HeldFrameSearcherArgs } from './rng/HeldFrameSearcher';
import type { SeedSheetData } from './seeds/types';
import type { GameSettingsProps } from './components/GameSettings';

type HeldFrameTabProps = {
  gameSettingsProps:  GameSettingsProps;
  parentSettingsProps: ParentSettingsProps;
  targetSettingsProps: TargetSettingsProps;
  seedSheet:          SeedSheetData;
  heldSeedsIndex:     number;
  setHeldSeedsIndex:  React.Dispatch<React.SetStateAction<number>>;
  heldSeedOffset:     number;
  setHeldSeedOffset:  React.Dispatch<React.SetStateAction<number>>;
  minHeldAdvances:    number;
  setMinHeldAdvances: React.Dispatch<React.SetStateAction<number>>;
  maxHeldAdvances:    number;
  setMaxHeldAdvances: React.Dispatch<React.SetStateAction<number>>;
  tid:                number;
  setTID:             React.Dispatch<React.SetStateAction<number>>;
  sid:                number;
  setSID:             React.Dispatch<React.SetStateAction<number>>;
  pickupSeed:         string;
  setPickupSeed:      React.Dispatch<React.SetStateAction<string>>;
  pickupAdvances:     number;
  setPickupAdvances:  React.Dispatch<React.SetStateAction<number>>;
  heldHits:           SearchResult[];
  setHeldHits:        React.Dispatch<React.SetStateAction<SearchResult[]>>;
};
export default function HeldFrameTab({ 
  gameSettingsProps, parentSettingsProps, targetSettingsProps, seedSheet, 
  heldSeedsIndex, setHeldSeedsIndex, heldSeedOffset, setHeldSeedOffset,
  minHeldAdvances, setMinHeldAdvances, maxHeldAdvances, setMaxHeldAdvances,
  tid, setTID, sid, setSID, heldHits, setHeldHits,
  setPickupSeed, pickupSeed, setPickupAdvances, pickupAdvances
}: HeldFrameTabProps){
  const heldSeedVals = seedSheet.seeds[heldSeedsIndex].map((s) => parseInt(s, 16) + heldSeedOffset);

  const heldSearchArgs: HeldFrameSearcherArgs = {
    seeds: heldSeedVals,
    delays: seedSheet.delays,
    pickupSeed: parseInt(pickupSeed, 16),
    pickupAdvances,
    minAdvances: minHeldAdvances,
    maxAdvances: maxHeldAdvances,
    parents: {
      parentIVsA:      parentSettingsProps.parentIVsA,
      parentIVsB:      parentSettingsProps.parentIVsB,
      compatibility:   parentSettingsProps.compatibility,
      genderThreshold: parentSettingsProps.genderThreshold
    },
    target: {
      ivs:     targetSettingsProps.ivs,
      nature:  targetSettingsProps.nature,
      ability: targetSettingsProps.ability,
      gender:  targetSettingsProps.gender,
      shiny:   targetSettingsProps.shiny,
      method:  targetSettingsProps.method
    },
    tidxorsid: tid ^ sid
  };

  return (
  <Stack spacing={3} sx={{ alignItems: "center", justifyContent: "center"}}>
    <GameSettings { ...gameSettingsProps }/>
    <SaveSettings tid={tid} setTID={setTID} sid={sid} setSID={setSID} />
    <SeedSettings 
      seedSheet={seedSheet} 
      seedsIndex={heldSeedsIndex} setSeedsIndex={setHeldSeedsIndex}
      seedOffset={heldSeedOffset} setSeedOffset={setHeldSeedOffset}
    />
    <ParentSettings {...parentSettingsProps}/>
    <TargetSettings {...targetSettingsProps}/>
    <AdvancesInput label="Held" 
      min={minHeldAdvances} setMin={setMinHeldAdvances}
      max={maxHeldAdvances} setMax={setMaxHeldAdvances}
    />
    <PickupFrameInput 
        seed={pickupSeed}        setSeed={setPickupSeed}
        advance={pickupAdvances} setAdvance={setPickupAdvances}
    />
    <Box sx={{ maxWidth: "500px" }} >
      <HeldSearchButton args={heldSearchArgs} setHeldHits={setHeldHits} />
    </Box>
    { (heldHits.length > 0) &&
      <ResultsDisplay 
        hits={heldHits} 
      />
    }
  
  </Stack>
  );
}