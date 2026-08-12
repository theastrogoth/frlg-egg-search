import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Credits(){
  return (
  <Box sx={{ paddingTop: "50px" }}>
    <Typography>Inspired by <Link href="https://lincoln-lm.github.io/ten-lines" target="_blank">Ten Lines</Link></Typography>
    <Typography>FRLG seeds farmed by blisy, po, HunarPG, 10Ben, Real96, ColdStoneSys, Papa Jefé, and トノ</Typography>
  </Box>
  );
}