import React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

type AdvancesSettingsProps = {
  label:    string;
  min:      number;
  setMin:   React.Dispatch<React.SetStateAction<number>>
  max:      number;
  setMax:   React.Dispatch<React.SetStateAction<number>>
}

export default function AdvancesSettings({ 
  label,
  min,   setMin, 
  max,   setMax 
}: AdvancesSettingsProps){
  return (
  <Stack spacing={1} direction="row">
    <TextField label={`Min ${label} Advances`}
      type="tel" 
      value={min}
      onChange={
        (e) => {
        let val = parseInt(e.target.value) || 0;
        if (val < 0){ 
            val = 0; 
        }else if (val > 10000000000){
            val = 10000000000;
        }
        setMin(val);
        }
      }
      error={min > max}
      sx={{ width: "200px"}}
    />
    <TextField label={`Max ${label} Advances`}
      type="tel" 
      value={max}
      onChange={
        (e) => {
        let val = parseInt(e.target.value) || 0;
        if (val < 0){ 
            val = 0; 
        }else if (val > 1000000000){
            val = 1000000000;
        }
        setMax(val);
        }
      }
      error={min > max}
      sx={{ width: "200px"}}
    />
  </Stack>
  )
}