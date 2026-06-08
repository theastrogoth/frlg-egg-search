
import React, { useState } from 'react';
import Box from '@mui/material/Box';;
import Stack from '@mui/material/Stack';

import GameSettings from './components/GameSettings';
import SaveSettings from './components/SaveSettings';
import SeedSettings from './components/SeedSettings';
import ParentSettings from './components/ParentSettings';
import TargetSettings from './components/TargetSettings';
import AdvancesInput from './components/AdvancesInput';
import PickupFrameInput from './components/PickupFrameInput';
import HeldSearchButton from './components/HeldSearchButton';
import HeldResultsDisplay from './components/HeldResultsDisplay';

import { type Nature, type IVs, type ShinyType, type Compatibility, type SearchResult, type EggMethod } from './rng/interface';
import type { HeldFrameSearcherArgs } from './rng/HeldFrameSearcher';
import type { SeedSheetData } from './seeds/types';
import type { GameSettingsProps } from './components/GameSettings';

type HeldFrameTabProps = {
  gameSettingsProps:  GameSettingsProps;
  seedSheet:          SeedSheetData;
  heldSeedsIndex:     number;
  setHeldSeedsIndex:  React.Dispatch<React.SetStateAction<number>>;
  genderThreshold:    number,
  setGenderThreshold: React.Dispatch<React.SetStateAction<number>>;
  compatibility:      Compatibility
  setCompatibility:   React.Dispatch<React.SetStateAction<Compatibility>>;
  parentIVsA:         IVs;
  setParentIVsA:      React.Dispatch<React.SetStateAction<IVs>>;
  parentIVsB:         IVs;
  setParentIVsB:      React.Dispatch<React.SetStateAction<IVs>>;
  targetIVs:          IVs;
  setTargetIVs:       React.Dispatch<React.SetStateAction<IVs>>;
  targetNature:       Nature;
  setTargetNature:    React.Dispatch<React.SetStateAction<Nature>>;
  targetShiny:        ShinyType;
  setTargetShiny:     React.Dispatch<React.SetStateAction<ShinyType>>;
  eggMethod:          EggMethod;
  setEggMethod:       React.Dispatch<React.SetStateAction<EggMethod>>;
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
  gameSettingsProps, seedSheet, heldSeedsIndex, setHeldSeedsIndex,
  genderThreshold, setGenderThreshold, compatibility, setCompatibility,
  parentIVsA, setParentIVsA, parentIVsB, setParentIVsB, 
  targetIVs, setTargetIVs, targetNature, setTargetNature,
  targetShiny, setTargetShiny, eggMethod, setEggMethod,
  tid, setTID, sid, setSID, heldHits, setHeldHits,
  setPickupSeed, pickupSeed, setPickupAdvances, pickupAdvances
}: HeldFrameTabProps){

  const [minHeldAdvances, setMinHeldAdvances] = useState<number>(2000);
  const [maxHeldAdvances, setMaxHeldAdvances] = useState<number>(5000);

  const heldSeedVals = seedSheet.seeds[heldSeedsIndex].map((s) => parseInt(s, 16));

  const heldSearchArgs: HeldFrameSearcherArgs = {
    seeds: heldSeedVals,
    pickupSeed: parseInt(pickupSeed, 16),
    pickupAdvances,
    minAdvances: minHeldAdvances,
    maxAdvances: maxHeldAdvances,
    compatibility,
    parentIVsA,
    parentIVsB,
    targetIVs,
    targetNature,
    targetShiny,
    method: "normal",
    tidxorsid: tid ^ sid
  };

  return (
  <Stack spacing={3} sx={{ alignItems: "center", justifyContent: "center"}}>
    <GameSettings { ...gameSettingsProps }/>
    <SaveSettings tid={tid} setTID={setTID} sid={sid} setSID={setSID} />
    <SeedSettings 
      seedSheet={seedSheet} seedsIndex={heldSeedsIndex} 
      setSeedsIndex={setHeldSeedsIndex}
    />
    <ParentSettings 
      compatibility={compatibility}     setCompatibility={setCompatibility}
      genderThreshold={genderThreshold} setGenderThreshold={setGenderThreshold}
      parentIVsA={parentIVsA} setParentIVsA={setParentIVsA}
      parentIVsB={parentIVsB} setParentIVsB={setParentIVsB}
    />
    <TargetSettings 
      ivs={targetIVs}       setIVs={setTargetIVs}
      nature={targetNature} setNature={setTargetNature}
      eggMethod={eggMethod} setEggMethod={setEggMethod}
      shiny={targetShiny}  setShiny={setTargetShiny}
    />
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
      <HeldResultsDisplay 
        hits={heldHits} 
        genderThreshold={genderThreshold}
      />
    }
  
  </Stack>
  );
}