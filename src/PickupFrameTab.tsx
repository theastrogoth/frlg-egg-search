
import React from 'react';
import Box from '@mui/material/Box';;
import Stack from '@mui/material/Stack';

import GameSettings, { type GameSettingsProps } from './components/GameSettings';
import SaveSettings from './components/SaveSettings';
import SeedSettings from './components/SeedSettings';
import ParentSettings, { type ParentSettingsProps } from './components/ParentSettings';
import TargetSettings, { type TargetSettingsProps } from './components/TargetSettings';
import AdvancesInput from './components/AdvancesInput';
import PickupSearchButton from './components/PickupSearchButton';
import ResultsDisplay from './components/ResultsDisplay';

import { type SearchResult } from './rng/interface';
import type { SeedSheetData } from './seeds/types';
import type { PickupFrameSearcherArgs } from './rng/PickupFrameSearcher';

type PickupFrameTabProps = {
  gameSettingsProps:    GameSettingsProps;
  parentSettingsProps:  ParentSettingsProps
  targetSettingsProps:  TargetSettingsProps;
  seedSheet:            SeedSheetData;
  pickupSeedsIndex:     number;
  setPickupSeedsIndex:  React.Dispatch<React.SetStateAction<number>>;
  pickupSeedOffset:     number;
  setPickupSeedOffset:  React.Dispatch<React.SetStateAction<number>>;
  minPickupAdvances:    number;
  setMinPickupAdvances: React.Dispatch<React.SetStateAction<number>>;
  maxPickupAdvances:    number;
  setMaxPickupAdvances: React.Dispatch<React.SetStateAction<number>>;
  tid:                  number;
  setTID:               React.Dispatch<React.SetStateAction<number>>;
  sid:                  number;
  setSID:               React.Dispatch<React.SetStateAction<number>>;
  pickupHits:           SearchResult[];
  setPickupHits:        React.Dispatch<React.SetStateAction<SearchResult[]>>;
  setPickupSeed:        React.Dispatch<React.SetStateAction<string>>;
  setPickupAdvances:    React.Dispatch<React.SetStateAction<number>>;
  setTab:               React.Dispatch<React.SetStateAction<number>>;
};

export default function PickupFrameTab({ 
  gameSettingsProps, targetSettingsProps, parentSettingsProps, seedSheet, 
  pickupSeedsIndex, setPickupSeedsIndex, pickupSeedOffset, setPickupSeedOffset,
  minPickupAdvances, setMinPickupAdvances, maxPickupAdvances, setMaxPickupAdvances,
  tid, setTID, sid, setSID, pickupHits, setPickupHits,
  setPickupSeed, setPickupAdvances, setTab
}: PickupFrameTabProps){
  const pickupSeedVals = seedSheet.seeds[pickupSeedsIndex].map((s) => parseInt(s, 16) + pickupSeedOffset);

  const pickupSearchArgs: PickupFrameSearcherArgs = {
    seeds: pickupSeedVals,
    delays: seedSheet.delays,
    minAdvances: minPickupAdvances,
    maxAdvances: maxPickupAdvances,
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
      seedsIndex={pickupSeedsIndex} setSeedsIndex={setPickupSeedsIndex}
      seedOffset={pickupSeedOffset} setSeedOffset={setPickupSeedOffset}
    />
    <ParentSettings {...parentSettingsProps} />
    <TargetSettings {...targetSettingsProps} />
    <AdvancesInput label="Pickup" 
      min={minPickupAdvances} setMin={setMinPickupAdvances}
      max={maxPickupAdvances} setMax={setMaxPickupAdvances}
    />
    <Box sx={{ maxWidth: "500px" }} >
      <PickupSearchButton args={pickupSearchArgs} setPickupHits={setPickupHits} />
    </Box>
    { (pickupHits.length > 0) &&
      <ResultsDisplay 
        hits={pickupHits} 
        setPickupSeed={setPickupSeed}
        setPickupAdvances={setPickupAdvances}
        setTab={setTab}
      />
    }
  
  </Stack>
  );
}