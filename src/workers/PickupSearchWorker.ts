import PickupFrameSearcher, { type PickupFrameSearcherArgs } from "../rng/PickupFrameSearcher";

self.onmessage = (event: MessageEvent<PickupFrameSearcherArgs>) => {
    const data = event.data;

    const searcher = new PickupFrameSearcher(data);
    const result = searcher.search();

    self.postMessage(result);
}