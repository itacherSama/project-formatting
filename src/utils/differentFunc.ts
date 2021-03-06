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

export const deleteItemFromArrByIdx = (state: any, idx: number) => {
  const newState = [...state];
  newState.splice(idx, 1);
  return newState;
};

export const setLengthKitsImagesFunc = (state: any, length: number, newItem: any) => {
  const newState = [...state];
  if (length > state.length) {
    const needIncreaseLength = length - state.length;
    const newItems = new Array(needIncreaseLength).fill(newItem);
    
    newState.push(...newItems);
  }
  return newState;
};