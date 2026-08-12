import React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

type PickupFrameInputProps = {
  seed:       string;
  setSeed:    React.Dispatch<React.SetStateAction<string>>;
  advance:    number;
  setAdvance: React.Dispatch<React.SetStateAction<number>>;
}

export default function PickupFrameInput({ seed, setSeed, advance, setAdvance }: PickupFrameInputProps){
  const valid = seed !== "" && !isNaN(parseInt(seed, 16))
  return (
  <Stack spacing={2} direction="row" sx={{ alignItems: "center", justifyContent: "center" }}>
    <TextField label="Pickup Seed"
      value={seed}
      slotProps={{ htmlInput: { maxLength: 4} }}
      onChange={(e) => setSeed(e.target.value)}
      error={ !valid }
      sx={{ width: "200px"}}
    />
    <TextField label="Pickup Advance"
      type="tel"
      value={advance}
      onChange={ (e) => {
        let val = parseInt(e.target.value) || 0;
        if (val < 0){ 
            val = 0; 
        }else if (val > 1000000000){
            val = 1000000000;
        }
        setAdvance(val);
        }
      }
      error={ !valid }
      sx={{ width: "200px"}}
    />
  </Stack>
  );
}