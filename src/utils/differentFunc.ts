import { IobjIdxKitImages } from '../interfaces/items';

export const findNewCurrentIdx = (state: IobjIdxKitImages, operation: string): IobjIdxKitImages => {
  let newIdx;
  if (operation === '-') {
    newIdx = state.idx - 1;
  } else {
    newIdx = state.idx + 1;
  }

  const hasIdx = (newIdx <= state.maxIdx) && newIdx > -1;
  if (!hasIdx) {
    return state;
  }

  return {
    ...state,
    idx: newIdx,
  };
};
