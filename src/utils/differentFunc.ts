import { IPointPlace, IobjIdxKitImages } from '../interfaces/items';

export const findNewCurrentIdx = (state: IobjIdxKitImages, operation: string): IobjIdxKitImages => {
  const newIdx = operation === '-' ? state.idx - 1 : state.idx + 1;

  const hasIdx = newIdx <= state.maxIdx && newIdx > -1;
  if (!hasIdx) {
    return state;
  }

  return {
    ...state,
    idx: newIdx,
  };
};

export const deleteItemFromArrByIdx = <T>(state: Array<T>, idx: number): Array<T> => {
  const newState = [...state];
  newState.splice(idx, 1);
  return newState;
};

export const copyObject = <T>(object: T): T => JSON.parse(JSON.stringify(object));

export const setLengthKitsImagesFunc = <T>(state: Array<T>, length: number, newItem: T): Array<T> => {
  const newState = [...state];
  if (length > state.length) {
    const needIncreaseLength = length - state.length;
    const newItems = new Array(needIncreaseLength).fill(0).map(() => copyObject(newItem));

    newState.push(...newItems);
  }
  return newState;
};
