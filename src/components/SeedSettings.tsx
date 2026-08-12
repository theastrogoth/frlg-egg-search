import React from 'react';
import Stack from '@mui/material/Stack';;
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { type SeedSheetData } from '../seeds/types';


type SeedSettingsProps = {
  seedSheet:      SeedSheetData;
  seedsIndex:     number;
  setSeedsIndex:  React.Dispatch<React.SetStateAction<number>>;
  seedOffset:     number;
  setSeedOffset:  React.Dispatch<React.SetStateAction<number>>;
}

export default function SeedSettings({ 
  seedSheet, 
  seedsIndex, setSeedsIndex,
  seedOffset, setSeedOffset
}: SeedSettingsProps){
    
  return (
  <Stack spacing={2}>
    <FormControl>
      <InputLabel id="settings-label">Seed Settings</InputLabel>
      <Select
        labelId="settings-label"
        value={seedsIndex}
        label="Seed Settings"
        onChange={(e) => {
          const idx = e.target.value;
          setSeedsIndex(idx);
        }}
        sx={{ width: "408px"}}
      >
        {
          seedSheet.settings.map((s,i) => <MenuItem value={i}>{s}</MenuItem>)
        }
      </Select>
    </FormControl>
    <FormControl>
      <InputLabel id="extrabutton-label">Extra Button</InputLabel>
      <Select
        labelId="extrabutton-label"
        value={seedOffset}
        label="Extra Button"
        onChange={(e) => setSeedOffset(e.target.value)}
        sx={{ width: "408px"}}
      >
        <MenuItem value={0}>None</MenuItem>
        <MenuItem value={-36}>Blackout L / Blackout R</MenuItem>
      </Select>
    </FormControl>
  </Stack>
  );
}