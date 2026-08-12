import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { type IVs } from '../rng/interface';

type IVFieldProps = {
  index:  number
  label:  string
  ivs:    IVs
  setIVs: React.Dispatch<React.SetStateAction<IVs>>
}

function IVField({ index, label, ivs, setIVs}: IVFieldProps){
  return(
  <TextField label={label}
    type="tel" 
    size="small"
    value={ivs[index]}
    onChange={
        (e) => {
        let val = parseInt(e.target.value) || 0;
        if (val < 0){ 
            val = 0; 
        }else if (val > 31){
            val = 31;
        }
        const newIVs = ivs.slice() as IVs;
        newIVs[index] = val;
        setIVs(newIVs);
        }
    }
    sx={{ width: "60px"}}
  />
  );
}

type IVsInputProps = {
  label:  string
  ivs:    IVs
  setIVs: React.Dispatch<React.SetStateAction<IVs>>
}

export default function IVsInput({ label, ivs, setIVs }: IVsInputProps){
  return (
    <Stack spacing={1} direction="row">
      <Typography variant="body1" sx={{ width: "100px" }}>{label}</Typography>
      <IVField label="HP"  index={0} ivs={ivs} setIVs={setIVs} />
      <IVField label="Atk" index={1} ivs={ivs} setIVs={setIVs} />
      <IVField label="Def" index={2} ivs={ivs} setIVs={setIVs} />
      <IVField label="SpA" index={3} ivs={ivs} setIVs={setIVs} />
      <IVField label="SpD" index={4} ivs={ivs} setIVs={setIVs} />
      <IVField label="Spe" index={5} ivs={ivs} setIVs={setIVs} />
    </Stack>
  );
}