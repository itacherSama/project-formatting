import { createStore } from 'effector';

import { findNewCurrentIdx } from '@utils/differentFunc';
import { IobjIdxKitImages } from '@interfaces/interfaces';
import * as events from '../event';

export const $idxKitImages = createStore<IobjIdxKitImages>({ idx: 0, maxIdx: 0 })
  .on(events.setCurrentIdx, (state: IobjIdxKitImages, length: number) => ({
    maxIdx: length - 1,
    idx: 0,
  }))
  .on(events.nextKitImages, (state: IobjIdxKitImages) => findNewCurrentIdx(state, '+'))
  .on(events.previousKitImages, (state: IobjIdxKitImages) => findNewCurrentIdx(state, '-'));
