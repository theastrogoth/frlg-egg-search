import { useState } from 'react';
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
import { getGenderString, getInheritanceString, getIVsString } from '../rng/utils';

type PickupResultsDisplay = {
  hits: SearchResult[];
  genderThreshold: number;
};

type PickupResultsDisplayProps = {
  hits:              SearchResult[];
  genderThreshold:   number;
}

export default function PickupResultsDisplay({ hits, genderThreshold }: PickupResultsDisplayProps) {

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
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Seed</TableCell>
            <TableCell align="center">Advances</TableCell>
            <TableCell align="center">PID</TableCell>
            <TableCell align="center">Nature</TableCell>
            <TableCell align="center">IVs</TableCell>
            <TableCell align="center">Ability</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">Shiny</TableCell>
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
              <TableCell align="right">{Number(h.egg.pid).toString(16).toUpperCase()}</TableCell>
              <TableCell align="right">{h.egg.nature}</TableCell>
              <TableCell align="right">{toIVsString(h.egg.ivs, h.egg.inheritance)}</TableCell>
              <TableCell align="center">{h.egg.ability}</TableCell>
              <TableCell align="center">{getGenderString(h.egg.gender, genderThreshold)}</TableCell>
              <TableCell align="center">{h.egg.shiny}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Stack>
  );
}