import React from 'react';
import Box from '@mui/material/Box';;
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { type SeedSheetData } from '../seeds/types';


type SeedSettingsProps = {
  seedSheet:      SeedSheetData,
  seedsIndex:     number,
  setSeedsIndex:  React.Dispatch<React.SetStateAction<number>>
}

export default function SeedSettings({ seedSheet, seedsIndex, setSeedsIndex }: SeedSettingsProps){
    
  return (
  <Box>
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
  </Box>
  );
}