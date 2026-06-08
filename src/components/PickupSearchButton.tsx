import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

import PickupSearchWorker from '../workers/PickupSearchWorker?worker';
import { type PickupFrameSearcherArgs } from '../rng/PickupFrameSearcher';
import type { SearchResult } from '../rng/interface';

const worker = new PickupSearchWorker();

type PickupSearchButtonProps = {
  args:          PickupFrameSearcherArgs
  setPickupHits: React.Dispatch<React.SetStateAction<SearchResult[]>>
}

export default function PickupSearchButton({ args, setPickupHits }: PickupSearchButtonProps){
  const [disabled, setDisabled] = useState(false);
  const valid = args.maxAdvances >= args.minAdvances;

  useEffect(() => {
    worker.onmessage = (event: MessageEvent<SearchResult[]>) => {
      if (event && event.data) {
        setPickupHits(event.data);
        setDisabled(false);
        console.log(`Pickup search finished with ${event.data.length} hits!`)
      }
    }
  }, [setPickupHits])

  const handleButtonPress = () => {
    setDisabled(true);
    worker.postMessage(args);
    console.log('Starting Pickup Frames search...')
  }
  
  return (
  <Button variant="contained"
    disabled={disabled || !valid}
    onClick={handleButtonPress}
  > 
    Search Pickup Frames  
  </Button>
  );
}