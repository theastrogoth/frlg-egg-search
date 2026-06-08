import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { type IVs, type SearchResult } from '../rng/interface';
import { getInheritanceString, getIVsString } from '../rng/utils';
import Button from '@mui/material/Button';

type PickupResultsDisplay = {
  hits: SearchResult[];
  genderThreshold: number;
};

type PickupResultsDisplayProps = {
  hits:              SearchResult[];
  setPickupSeed:     React.Dispatch<React.SetStateAction<string>>;
  setPickupAdvances: React.Dispatch<React.SetStateAction<number>>;
  setTab:            React.Dispatch<React.SetStateAction<number>>;
}

export default function PickupResultsDisplay(
  { hits, setPickupSeed, setPickupAdvances, setTab }: PickupResultsDisplayProps
) {

  const [showInheritance, setShowInheritance] = useState(false);

  const toIVsString = (ivs: IVs, inh: IVs) => showInheritance ? getInheritanceString(ivs, inh) : getIVsString(ivs);

  return (
  <Stack spacing={2} sx={{ alignItems: "center", justifyContent: "center" }}>
    <FormGroup row>
      <FormControlLabel label="Show Inheritance"
        control={
          <Checkbox value={showInheritance} onClick={() => setShowInheritance(!showInheritance)} />
        }  
      />
    </FormGroup>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400, maxWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Seed</TableCell>
            <TableCell align="center">Advances</TableCell>
            <TableCell align="center">IVs</TableCell>
            <TableCell align="center">Find Held Frames</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hits.map((h, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{Number(h.seed).toString(16).toUpperCase()}</TableCell>
              <TableCell align="right">{h.advances}</TableCell>
              <TableCell align="right">{toIVsString(h.egg.ivs, h.egg.inheritance)}</TableCell>
              <TableCell align="center">
                <Button variant="contained"
                  size="small"
                  onClick={() => {
                    setPickupSeed(Number(h.seed).toString(16).toUpperCase());
                    setPickupAdvances(h.advances);
                    setTab(1);
                  }}
                > 
                  Select
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Stack>
  );
}