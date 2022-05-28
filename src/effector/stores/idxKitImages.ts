import { createStore } from 'effector-logger';

import { findNewCurrentIdx } from 'utils/differentFunc';
import { IobjIdxKitImages } from 'interfaces/interfaces';
import * as events from '../event';

export const $idxKitImages = createStore<IobjIdxKitImages>(
  { idx: 0, maxIdx: 0 },
  {
    name: '$idxKitImages',
  }
)
  .on(events.setCurrentIdx, (state: IobjIdxKitImages, length: number) => ({
    maxIdx: length > 0 ? length - 1 : 0,
    idx: 0,
  }))
  .on(events.nextKitImages, (state: IobjIdxKitImages) => findNewCurrentIdx(state, '+'))
  .on(events.previousKitImages, (state: IobjIdxKitImages) => findNewCurrentIdx(state, '-'));
