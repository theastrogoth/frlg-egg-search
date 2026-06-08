
import React, { useState } from 'react';
import Box from '@mui/material/Box';;
import Stack from '@mui/material/Stack';

import GameSettings, { type GameSettingsProps } from './components/GameSettings';
import SaveSettings from './components/SaveSettings';
import SeedSettings from './components/SeedSettings';
import ParentSettings from './components/ParentSettings';
import TargetSettings from './components/TargetSettings';
import AdvancesInput from './components/AdvancesInput';
import PickupSearchButton from './components/PickupSearchButton';
import PickupResultsDisplay from './components/PickupResultsDisplay';

import { type Nature, type IVs, type ShinyType, type Compatibility, type SearchResult, type EggMethod } from './rng/interface';
import type { SeedSheetData } from './seeds/types';
import type { PickupFrameSearcherArgs } from './rng/PickupFrameSearcher';

type PickupFrameTabProps = {
  gameSettingsProps:   GameSettingsProps;
  seedSheet:           SeedSheetData;
  pickupSeedsIndex:    number;
  setPickupSeedsIndex: React.Dispatch<React.SetStateAction<number>>;
  genderThreshold:     number;
  setGenderThreshold:  React.Dispatch<React.SetStateAction<number>>;
  compatibility:       Compatibility;
  setCompatibility:    React.Dispatch<React.SetStateAction<Compatibility>>;
  parentIVsA:          IVs;
  setParentIVsA:       React.Dispatch<React.SetStateAction<IVs>>;
  parentIVsB:          IVs;
  setParentIVsB:       React.Dispatch<React.SetStateAction<IVs>>;
  targetIVs:           IVs;
  setTargetIVs:        React.Dispatch<React.SetStateAction<IVs>>;
  targetNature:        Nature;
  setTargetNature:     React.Dispatch<React.SetStateAction<Nature>>;
  targetShiny:         ShinyType;
  setTargetShiny:      React.Dispatch<React.SetStateAction<ShinyType>>;
  eggMethod:           EggMethod;
  setEggMethod:        React.Dispatch<React.SetStateAction<EggMethod>>;
  tid:                 number;
  setTID:              React.Dispatch<React.SetStateAction<number>>;
  sid:                 number;
  setSID:              React.Dispatch<React.SetStateAction<number>>;
  pickupHits:          SearchResult[];
  setPickupHits:       React.Dispatch<React.SetStateAction<SearchResult[]>>;
  setPickupSeed:       React.Dispatch<React.SetStateAction<string>>;
  setPickupAdvances:   React.Dispatch<React.SetStateAction<number>>;
  setTab:              React.Dispatch<React.SetStateAction<number>>;
};
export default function PickupFrameTab({ 
  gameSettingsProps, seedSheet, pickupSeedsIndex, setPickupSeedsIndex,
  genderThreshold, setGenderThreshold, compatibility, setCompatibility,
  parentIVsA, setParentIVsA, parentIVsB, setParentIVsB, 
  targetIVs, setTargetIVs, targetNature, setTargetNature,
  targetShiny, setTargetShiny, eggMethod, setEggMethod,
  tid, setTID, sid, setSID, pickupHits, setPickupHits,
  setPickupSeed, setPickupAdvances, setTab
}: PickupFrameTabProps){

  const [minPickupAdvances, setMinPickupAdvances] = useState<number>(2000);
  const [maxPickupAdvances, setMaxPickupAdvances] = useState<number>(5000);

  const pickupSeedVals = seedSheet.seeds[pickupSeedsIndex].map((s) => parseInt(s, 16));

  const pickupSearchArgs: PickupFrameSearcherArgs = {
    seeds: pickupSeedVals,
    minAdvances: minPickupAdvances,
    maxAdvances: maxPickupAdvances,
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
      seedSheet={seedSheet} seedsIndex={pickupSeedsIndex} 
      setSeedsIndex={setPickupSeedsIndex}
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
    <AdvancesInput label="Pickup" 
      min={minPickupAdvances} setMin={setMinPickupAdvances}
      max={maxPickupAdvances} setMax={setMaxPickupAdvances}
    />
    <Box sx={{ maxWidth: "500px" }} >
      <PickupSearchButton args={pickupSearchArgs} setPickupHits={setPickupHits} />
    </Box>
    { (pickupHits.length > 0) &&
      <PickupResultsDisplay 
        hits={pickupHits} 
        setPickupSeed={setPickupSeed}
        setPickupAdvances={setPickupAdvances}
        setTab={setTab}
      />
    }
  
  </Stack>
  );
}