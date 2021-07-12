import { IobjIdxKitImages } from '../interfaces/items';

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

export const deleteItemFromArrByIdx = (state: any, idx: number): Array<any> => {
  const newState = [...state];
  newState.splice(idx, 1);
  return newState;
};

export const copyObject = (object: any) => JSON.parse(JSON.stringify(object));

export const setLengthKitsImagesFunc = (state: any, length: number, newItem: any) => {
  const newState = [...state];
  if (length > state.length) {
    const needIncreaseLength = length - state.length;
    const newItems = new Array(needIncreaseLength).fill(0).map(() => copyObject(newItem));

    newState.push(...newItems);
  }
  return newState;
};

export const findPointOnCanvas = (obj: { x: number; y: number }, canvas: any, func: any) => {
  const x = func(canvas.width, obj.x);
  const y = func(canvas.height, obj.y);
  return { x, y };
};
