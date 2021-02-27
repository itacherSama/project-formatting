import { IobjIdxKitImages } from '../interfaces/items';

export const findNewCurrentIdx = (state: IobjIdxKitImages, operation: string): IobjIdxKitImages => {
  const newIdx = operation === '-' ? state.idx - 1 : state.idx + 1;

  const hasIdx = (newIdx <= state.maxIdx) && newIdx > -1;
  if (!hasIdx) {
    return state;
  }

  return {
    ...state,
    idx: newIdx,
  };
};

const executeFuncIfNotArray = (item: any, func: (el: any) => any): any => {
  if (Array.isArray(item)) {
    return item.map((el: any) => {
      return executeFuncIfNotArray(el, func);
    });
  } else {
    return func(item);
  }
};
