import { ICropFormData, IobjIdxKitImages, IPointOnImg, IPointPlace, ISettingImg } from 'interfaces/interfaces';

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

export const throwErrorIfNull = (flag: boolean): never | undefined => {
  if (flag) {
    throw new Error();
  }
  return undefined;
};

export const checkCoordinates = (pointPlace: IPointPlace): boolean => {
  const { x, y } = pointPlace;
  if (x === null || y === null) {
    return true;
  }
  return false;
};

export const checkProportions = (cropFormData: ICropFormData): boolean => {
  const { width, height } = cropFormData;
  if (width === null || height === null) {
    return true;
  }
  return false;
};

export const checkDefaultSettingImg = (settingImg: ISettingImg): boolean => {
  const { width, height, x, y } = settingImg;
  if (checkProportions({ width, height }) || checkCoordinates({ x, y })) {
    return true;
  }
  return false;
};

export const checkPositionByPoint = (pointOnImg: IPointOnImg): boolean => {
  const { pointPlace, pointWidth } = pointOnImg;
  if (pointWidth === null || checkCoordinates(pointPlace)) {
    return true;
  }
  return false;
};

export const getValueLS = (key: string, cb: any): void => {
  const val = localStorage.getItem(key);
  if (typeof val === 'string') {
    const objVal = JSON.parse(val);
    cb(objVal);
  }
};
