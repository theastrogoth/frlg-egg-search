import { useState } from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Divider from '@mui/material/Divider';

import PickupFrameTab from './PickupFrameTab';
import HeldFrameTab from './HeldFrameTab';
import Credits from './components/Credits';

import { type GameVersion, type Language, type SeedSheetData } from './seeds/types';
import { type Nature, type Compatibility, type IVs, type ShinyType, type EggMethod, type SearchResult } from './rng/interface';

import { FR_ENG_SEEDS } from './seeds/seeds';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});


function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [version, setVersion] = useState('FireRed' as GameVersion);
  const [language, setLanguage] = useState('ENG/SPA/FRE/ITA/GER' as Language);

  const [seedSheet, setSeedSheet] = useState<SeedSheetData>(FR_ENG_SEEDS);

  const gameSettingsProps = {
    version,     setVersion,
    language,    setLanguage,
    setSeedSheet
  };

  const [tid, setTID] = useState<number>(0);
  const [sid, setSID] = useState<number>(0);

  const [compatibility,   setCompatibility]   = useState<Compatibility>("low");
  const [genderThreshold, setGenderThreshold] = useState<number>(126);
  const [parentIVsA, setParentIVsA] = useState<IVs>([31,31,31,31,31,31]);
  const [parentIVsB, setParentIVsB] = useState<IVs>([31,31,31,31,31,31]);

  const [targetIVs,    setTargetIVs]    = useState<IVs>([31,31,31,31,31,31]);
  const [targetNature, setTargetNature] = useState<Nature>("Hardy");
  const [targetShiny,  setTargetShiny]  = useState<ShinyType>("Square");
  const [eggMethod,    setEggMethod] = useState<EggMethod>("normal");

  const [pickupSeed, setPickupSeed] = useState<string>("");
  const [pickupAdvances, setPickupAdvances] = useState<number>(0);

  const [tab, setTab] = useState<number>(0);

  const [pickupSeedsIndex, setPickupSeedsIndex] = useState<number>(0);
  const [heldSeedsIndex,   setHeldSeedsIndex]   = useState<number>(0);

  const [pickupHits, setPickupHits] = useState<SearchResult[]>([]);
  const [heldHits,   setHeldHits]   = useState<SearchResult[]>([]);

  const pickupTabProps = {
    gameSettingsProps, seedSheet, pickupSeedsIndex, setPickupSeedsIndex,
    genderThreshold, setGenderThreshold, compatibility, setCompatibility,
    parentIVsA, setParentIVsA, parentIVsB, setParentIVsB,
    targetIVs, setTargetIVs, targetNature, setTargetNature,  
    targetShiny, setTargetShiny, eggMethod, setEggMethod,
    tid, setTID, sid, setSID, pickupHits, setPickupHits,
    setPickupSeed, setPickupAdvances, setTab
  };

  const heldTabProps = {
    gameSettingsProps, seedSheet, heldSeedsIndex, setHeldSeedsIndex,
    genderThreshold, setGenderThreshold, compatibility, setCompatibility,
    parentIVsA, setParentIVsA, parentIVsB, setParentIVsB,
    targetIVs, setTargetIVs, targetNature, setTargetNature,  
    targetShiny, setTargetShiny, eggMethod, setEggMethod,
    tid, setTID, sid, setSID, heldHits, setHeldHits,
    pickupSeed, setPickupSeed, pickupAdvances, setPickupAdvances
  };

  return (
  <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
    <CssBaseline />  
    <Box>
      <Box sx={{ justifySelf: "left", mx: 1, my: 1 }}>
        <Typography variant="h4">FRLG Egg Search Tool</Typography>
      </Box>
      <Stack spacing={2}>
        <Tabs centered
          value={tab} 
          onChange={(_, v: number) => setTab(v)}
        >
          <Tab label="Pickup Frame" />
          <Tab label="Held Frame" />
        </Tabs>
        <Divider />
        { tab === 0 &&
          <PickupFrameTab {...pickupTabProps}/>
        }
        { tab === 1 &&
          <HeldFrameTab {...heldTabProps}/>
        }
      </Stack>
      <Credits/>
    </Box>
  </ThemeProvider>
  )
}

export default App
