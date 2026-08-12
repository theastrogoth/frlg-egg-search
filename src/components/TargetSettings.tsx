/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import IVsField from './IVsInput';

import { type IVs, type Nature, type Gender, NATURES, type ShinyType, type EggMethod } from '../rng/interface';



export type TargetSettingsProps = {
  ivs:              IVs;
  setIVs:           React.Dispatch<React.SetStateAction<IVs>>;
  nature:           Nature;
  setNature:        React.Dispatch<React.SetStateAction<Nature>>;
  ability:          number;
  setAbility:       React.Dispatch<React.SetStateAction<number>>;
  gender:           Gender;
  setGender:        React.Dispatch<React.SetStateAction<Gender>>;
  genderThreshold:  number;
  shiny:            ShinyType;
  setShiny:         React.Dispatch<React.SetStateAction<ShinyType>>;
  method:           EggMethod;
  setMethod:        React.Dispatch<React.SetStateAction<EggMethod>>;
}


export default function TargetSettings({ 
  ivs,       setIVs, 
  nature,    setNature,
  ability,   setAbility,
  gender,    setGender, genderThreshold,
  shiny,     setShiny,
  method,    setMethod
}: TargetSettingsProps){

  const [validGenders, setValidGenders] = useState<Gender[]>(["Any", "Male", "Female"]);

  useEffect(() => {
    switch (genderThreshold){
      case -2:
        setGender("Any");
        setValidGenders(["Any"]);
        break;
      case -1: 
        setGender("Male");
        setValidGenders(["Male"]);
        break;
      case 255: 
        setGender("Female");
        setValidGenders(["Female"]);
        break;
      default:
        setValidGenders(["Any", "Male", "Female"]);
    }
  }, [genderThreshold, setGender])

  if (!validGenders.includes(gender)){
    setGender(validGenders[0]);
  }  

  return (
  <Stack spacing={2} sx={{ alignItems: "center", justifyContent: "center" }}>
    <IVsField label="Target IVs" ivs={ivs} setIVs={setIVs} />
    <FormControl>
      <InputLabel id="method-label">Method</InputLabel>
      <Select
        labelId="method-label"
        value={method}
        label="Method"
        onChange={(e) => setMethod(e.target.value as EggMethod)}
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
        <InputLabel id="ability-label">Target Ability</InputLabel>
        <Select
          labelId="ability-label"
          value={ability}
          label="Target Ability"
          onChange={(e) => setAbility(e.target.value)}
          sx={{ width: "200px"}}
        >
          <MenuItem value={-1}>Any</MenuItem>
          <MenuItem value={0} >0</MenuItem>
          <MenuItem value={1} >1</MenuItem>
        </Select>
      </FormControl>
    </Stack>
    <Stack direction="row" spacing={1} >
      <FormControl>
        <InputLabel id="gender-label">Target Gender</InputLabel>
        <Select
          labelId="gender-label"
          value={gender}
          label="Target Gender"
          onChange={(e) => setGender(e.target.value as Gender)}
          sx={{ width: "200px"}}
        >
          { validGenders.map((g) => <MenuItem value={g as Gender}>{g}</MenuItem>) }
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