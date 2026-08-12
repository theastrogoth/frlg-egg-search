import React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

type SaveSettingsProps = {
  tid:    number;
  setTID: React.Dispatch<React.SetStateAction<number>>
  sid:    number;
  setSID: React.Dispatch<React.SetStateAction<number>>
}

export default function SaveSettings({ tid, setTID, sid, setSID }: SaveSettingsProps){
  return (
  <Stack spacing={1} direction="row">
    <TextField label="TID"
      type="tel" 
      value={tid}
      onChange={
        (e) => {
          let val = parseInt(e.target.value) || 0;
          if (val < 0){ 
            val = 0; 
          }else if (val > 65535){
            val = 65535;
          }
          setTID(val);
        }
      }
      sx={{ width: "200px"}}
    />
    <TextField label="SID"
      type="tel"
      value={sid}
      onChange={
        (e) => {
          let val = parseInt(e.target.value) || 0;
          if (val < 0){ 
            val = 0; 
          }else if (val > 65535){
            val = 65535;
          }
          setSID(val);
        }
      }
      sx={{ width: "200px"}}
    />    
  </Stack>
  )
}