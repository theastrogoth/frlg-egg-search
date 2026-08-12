import HeldFrameSearcher, { type HeldFrameSearcherArgs } from "../rng/HeldFrameSearcher";

self.onmessage = (event: MessageEvent<HeldFrameSearcherArgs>) => {
    const data = event.data;

    const searcher = new HeldFrameSearcher(data);
    const result = searcher.search();

    self.postMessage(result);
}