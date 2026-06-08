import React from 'react';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import IVsField from './IVsInput';

import { type IVs, type Nature, NATURES, type ShinyType, type EggMethod } from '../rng/interface';



type TargetSettingsProps = {
  ivs:          IVs;
  setIVs:       React.Dispatch<React.SetStateAction<IVs>>;
  nature:       Nature;
  setNature:    React.Dispatch<React.SetStateAction<Nature>>;
  shiny:        ShinyType;
  setShiny:     React.Dispatch<React.SetStateAction<ShinyType>>;
  eggMethod:    EggMethod;
  setEggMethod: React.Dispatch<React.SetStateAction<EggMethod>>;
}


export default function TargetSettings({ 
  ivs,       setIVs, 
  nature,    setNature,
  shiny,     setShiny,
  eggMethod, setEggMethod
}: TargetSettingsProps){
  return (
  <Stack spacing={2} sx={{ alignItems: "center", justifyContent: "center" }}>
    <IVsField label="Target IVs" ivs={ivs} setIVs={setIVs} />
    <FormControl>
      <InputLabel id="method-label">Method</InputLabel>
      <Select
        labelId="method-label"
        value={eggMethod}
        label="Method"
        onChange={(e) => setEggMethod(e.target.value as EggMethod)}
        sx={{ width: "408px"}}
      >
        <MenuItem value={"normal" as EggMethod}>Normal</MenuItem>
        <MenuItem value={"split" as EggMethod}>Split</MenuItem>
        <MenuItem value={"alternate" as EggMethod}>Alternate</MenuItem>
        <MenuItem value={"mixed" as EggMethod}>Mixed</MenuItem>
      </Select>
    </FormControl>
    <Stack direction="row" spacing={1} >
      <FormControl>
        <InputLabel id="nature-label">Target Nature</InputLabel>
        <Select
          labelId="nature-label"
          value={nature}
          label="Target Nature"
          onChange={(e) => setNature(e.target.value as Nature)}
          sx={{ width: "200px"}}
        >
          { NATURES.map((n) => <MenuItem value={n as Nature}>{n}</MenuItem>) }
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="shiny-label">Target Shiny Type</InputLabel>
        <Select
          labelId="shiny-label"
          value={shiny}
          label="Target Shiny Type"
          onChange={(e) => setShiny(e.target.value as ShinyType)}
          sx={{ width: "200px"}}
        >
          <MenuItem value={"Any" as ShinyType}>Any</MenuItem>
          <MenuItem value={"Star" as ShinyType}>Star</MenuItem>
          <MenuItem value={"Square" as ShinyType}>Square</MenuItem>
          <MenuItem value={"Star/Square" as ShinyType}>Star/Square</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  </Stack>
  )
}