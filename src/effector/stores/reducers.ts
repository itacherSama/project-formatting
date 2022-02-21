import {
  ICancelCropImg,
  IInfoImg,
  IKitImageSettings,
  INewSettingsForKitImages,
  IPointImgInKitImages,
  ISetKitImages,
  ISettingsImage,
} from '@interfaces/interfaces';
import { calcPercentFromPx } from '@services/imageService';
import { copyObject, setLengthKitsImagesFunc } from '@utils/differentFunc';
import { initialStatePoint } from '@effector/stores/initStateStores';

export const getNewSettingsForKitImagesReducer = (
  state: ISettingsImage[],
  { transformedSettings, idx }: INewSettingsForKitImages
): ISettingsImage[] => {
  const newState = [...state];
  newState.splice(idx, 1, transformedSettings);

  return newState;
};

export const addKitImageSettingsReducer = (
  state: ISettingsImage[],
  { settingImg, idx, dataByNaturalSize }: IKitImageSettings
): ISettingsImage[] => {
  const newState = [...state];

  const { naturalWidth, naturalHeight } = dataByNaturalSize;
  const percentData: any = {
    x: calcPercentFromPx(naturalWidth, settingImg.x),
    y: calcPercentFromPx(naturalHeight, settingImg.y),
    width: calcPercentFromPx(naturalWidth, settingImg.width),
    height: calcPercentFromPx(naturalHeight, settingImg.height),
  };

  newState[idx].items.push(percentData);
  return newState;
};

export const deleteItemFromArrByIdxReducer = <T>(state: Array<T>, idx: number): Array<T> => {
  const newState = [...state];
  newState.splice(idx, 1);
  return newState;
};

export const setPointImgInKitImagesReducer = (
  state: ISettingsImage[],
  { pointOnImg, idx }: IPointImgInKitImages
): ISettingsImage[] => {
  const newState = [...state];
  const objSettings = newState[idx];

  if (pointOnImg) {
    objSettings.point = { ...pointOnImg };
  } else {
    objSettings.point = copyObject(initialStatePoint);
  }

  return newState;
};

export const setCancelCropImgReducer = (state: ISettingsImage[], { idx, idxImg }: ICancelCropImg): ISettingsImage[] => {
  const newState = [...state];
  const objSettings = newState[idx];
  objSettings.items.splice(idxImg, 1);

  return newState;
};

export const setCancelCropImgOnKitsImagesReducer = (
  state: IInfoImg[][],
  { idx, idxImg }: ICancelCropImg
): IInfoImg[][] => {
  const newState = [...state];
  const kitImages = newState[idx];
  kitImages.splice(idxImg, 1);

  return newState;
};

export const setLengthKitsImagesReducer = (state: ISettingsImage[], length: number): ISettingsImage[] => {
  return setLengthKitsImagesFunc(state, length, {
    point: initialStatePoint,
    items: [],
  });
};

export const setImagesReducer = (state: IInfoImg[], images: IInfoImg[]) => [...images];

export const setKitImagesReducer = (state: IInfoImg[][], { kitImages, idx }: ISetKitImages): IInfoImg[][] => {
  if (kitImages.length === 0) {
    return state;
  }
  const newState = [...state];
  newState.splice(idx, 1, kitImages);
  return newState;
};

export const setGeneratedKitsImagesReducer = (state: IInfoImg[][], kitsImages: IInfoImg[][]) => {
  let newState = [...state];
  newState = newState.map((el, idx) => {
    if (kitsImages[idx]) {
      return kitsImages[idx];
    }
    return el;
  });
  return newState;
};
