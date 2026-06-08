import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

import HeldSearchWorker from '../workers/HeldSearchWorker?worker';
import { type HeldFrameSearcherArgs } from '../rng/HeldFrameSearcher';
import type { SearchResult } from '../rng/interface';

const worker = new HeldSearchWorker();

type HeldSearchButtonProps = {
  args:        HeldFrameSearcherArgs
  setHeldHits: React.Dispatch<React.SetStateAction<SearchResult[]>>
}

export default function HeldSearchButton({ args, setHeldHits }: HeldSearchButtonProps){
  const [disabled, setDisabled] = useState(false);
  const valid = (
       !isNaN(args.pickupSeed)
    && (args.pickupAdvances > 0)
    && (args.maxAdvances >= args.minAdvances)
  );

  useEffect(() => {
    worker.onmessage = (event: MessageEvent<SearchResult[]>) => {
      if (event && event.data) {
        setHeldHits(event.data);
        setDisabled(false);
        console.log(`Held search finished with ${event.data.length} hits!`)
      }
    }
  }, [setHeldHits])

  const handleButtonPress = () => {
    setDisabled(true);
    worker.postMessage(args);
    console.log('Starting Held Frames search...')
  }
  
  return (
  <Button variant="contained"
    disabled={disabled || !valid}
    onClick={handleButtonPress}
  > 
    Search Held Frames  
  </Button>
  );
}