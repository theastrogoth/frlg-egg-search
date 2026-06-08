import React from 'react';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import IVsInput from './IVsInput';

import { type IVs, type Compatibility } from '../rng/interface';



type ParentSettingsProps = {
  compatibility:      Compatibility;
  setCompatibility:   React.Dispatch<React.SetStateAction<Compatibility>>;
  genderThreshold:    number;
  setGenderThreshold: React.Dispatch<React.SetStateAction<number>>;
  parentIVsA:         IVs;
  setParentIVsA:      React.Dispatch<React.SetStateAction<IVs>>;
  parentIVsB:         IVs;
  setParentIVsB:      React.Dispatch<React.SetStateAction<IVs>>;
}


export default function ParentSettings({ 
    parentIVsA,      setParentIVsA, 
    parentIVsB,      setParentIVsB, 
    compatibility,   setCompatibility,
    genderThreshold, setGenderThreshold
}: ParentSettingsProps){

  const handleSwap = () => {
    const tempParentIVsA = parentIVsA.slice() as IVs;
    setParentIVsA(parentIVsB);
    setParentIVsB(tempParentIVsA);
  };

  return (
  <Stack spacing={2} sx={{ alignItems: "center", justifyContent: "center" }} >
    <FormControl>
      <InputLabel id="gender-label">Egg Gender Ratio</InputLabel>
      <Select
        labelId="gender-label"
        value={genderThreshold}
        label="Egg Gender Ratio"
        onChange={(e) => setGenderThreshold(e.target.value)}
        sx={{ width: "408px"}}
      >
        <MenuItem value={-2} >N/A</MenuItem>
        <MenuItem value={-1} >{'Always \u2642'}</MenuItem>
        <MenuItem value={30} >{'87.5% \u2642 / 12.5% \u2640'}</MenuItem>
        <MenuItem value={63} >{'75% \u2642 / 25% \u2640'}</MenuItem>
        <MenuItem value={126}>{'50% \u2642 / 50% \u2640'}</MenuItem>
        <MenuItem value={190}>{'25% \u2642 / 75% \u2640'}</MenuItem>
        <MenuItem value={255}>{'Always \u2640'}</MenuItem>
      </Select>
    </FormControl>
    <FormControl>
      <InputLabel id="compatibility-label">Compatibility</InputLabel>
      <Select
        labelId="compatibility-label"
        value={compatibility}
        label="Compatibility"
        onChange={(e) => setCompatibility(e.target.value as Compatibility)}
        sx={{ width: "408px"}}
      >
        <MenuItem value={"low" as Compatibility}>The two don't seem to like each other</MenuItem>
        <MenuItem value={"medium" as Compatibility}>The two seem to get along</MenuItem>
        <MenuItem value={"high" as Compatibility}>The two seem to get along very well</MenuItem>
      </Select>
    </FormControl>
   
        <IVsInput label="Parent A" ivs={parentIVsA} setIVs={setParentIVsA} />
        <IVsInput label="Parent B" ivs={parentIVsB} setIVs={setParentIVsB} />
      <Button
        variant="contained"
        onClick={handleSwap}
      >
        Swap Parent IVs
      </Button>
  </Stack>
  )
}