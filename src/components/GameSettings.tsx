import React from 'react';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { type GameVersion, type Language, type SeedSheetData } from '../seeds/types';

import { FR_ENG_SEEDS, LG_ENG_SEEDS, FR_JPN_SEEDS, LG_JPN_SEEDS } from '../seeds/seeds';

export type GameSettingsProps = {
  version:      GameVersion;
  setVersion:   React.Dispatch<React.SetStateAction<GameVersion>>;
  language:     Language;
  setLanguage:  React.Dispatch<React.SetStateAction<Language>>;
  setSeedSheet: React.Dispatch<React.SetStateAction<SeedSheetData>>;
};

export default function GameSettings({ 
  version,     setVersion,
  language,    setLanguage,
  setSeedSheet
}: GameSettingsProps){

  const handleSettingsChange = (version: GameVersion, language: Language) => {
    if (version === "FireRed"){
      if (language === "ENG/SPA/FRE/ITA/GER"){
        setSeedSheet(FR_ENG_SEEDS);
      }else{ // JPN
        setSeedSheet(FR_JPN_SEEDS);
      }
    }else{ // LeafGreen
      if (language === "ENG/SPA/FRE/ITA/GER"){
        setSeedSheet(LG_ENG_SEEDS);
      }else{ // JPN
        setSeedSheet(LG_JPN_SEEDS);
      }
    }
  }

  return (
  <Stack spacing={2} sx={{ alignItems: "center", justifyContent: "center" }}>
    <FormControl>
      <InputLabel id="version-label">Version</InputLabel>
      <Select
        labelId="version-label"
        value={version}
        label="Version"
        onChange={(e) => {
          const newVersion = e.target.value as GameVersion;
          setVersion(newVersion);
          handleSettingsChange(newVersion, language);
        }}
        sx={{ width: "408px" }}
      >
        <MenuItem value={"FireRed" as GameVersion}>FireRed</MenuItem>
        <MenuItem value={"LeafGreen" as GameVersion}>LeafGreen</MenuItem>
      </Select>
    </FormControl>
    <FormControl>
      <InputLabel id="language-label">Language</InputLabel>
      <Select
        labelId="language-label"
        value={language}
        label="Language"
        onChange={(e) => {
          const newLanguage = e.target.value as Language;
          setLanguage(newLanguage);
          handleSettingsChange(version, newLanguage);
        }}
        sx={{ width: "408px" }}
      >
        <MenuItem value={"ENG/SPA/FRE/ITA/GER" as Language}>ENG/SPA/FRE/ITA/GER</MenuItem>
        <MenuItem value={"JPN" as Language}>JPN</MenuItem>
      </Select>
    </FormControl>
  </Stack>
  );
}