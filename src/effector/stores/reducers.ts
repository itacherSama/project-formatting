import {
  ICancelCropImg,
  IInfoImg,
  IKitImageSettings,
  INewSettingsForKitImages,
  IPointImgInKitImages,
  ISetKitImages,
  ISettingImg,
  ISettingsImage,
} from 'interfaces/interfaces';
import { calcPercentFromPx, transformSettingInPercent } from 'services/imageService';
import { copyObject, setLengthKitsImagesFunc } from 'utils/differentFunc';
import { initialStatePoint } from 'effector/stores/initStateStores';

export const getNewSettingsForKitImagesReducer = (
  state: ISettingsImage[],
  { transformedSettings, idx }: INewSettingsForKitImages
): ISettingsImage[] => {
  console.log('123132321321');
  const newState = [...state];
  newState.splice(idx, 1, transformedSettings);

  return newState;
};

export const addKitImageSettingsReducer = (
  state: ISettingsImage[],
  { settingImg, idx, dataByNaturalSize }: IKitImageSettings
): ISettingsImage[] => {
  const newState = [...state];

  const percentData: ISettingImg = transformSettingInPercent(settingImg, dataByNaturalSize);

  newState[idx].items.push(percentData);
  return newState;
};

export const changeKitImageSettingsReducer = (
  state: ISettingsImage[],
  { settingImg, idx, dataByNaturalSize, cropId }: IKitImageSettings
): ISettingsImage[] => {
  const newState = [...state];

  const percentData: ISettingImg = transformSettingInPercent(settingImg, dataByNaturalSize);

  newState[idx].items.splice(cropId!, 1, percentData);
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

export const setCancelSettingInKitsCropImgReducer = (
  state: ISettingsImage[],
  { idx, idxImg }: ICancelCropImg
): ISettingsImage[] => {
  const newState = [...state];
  const objSettings = newState[idx];
  objSettings.items.splice(idxImg, 1);

  return newState;
};

export const setCancelCropImgInKitsImagesReducer = (
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

export const setKitImagesReducer = (state: IInfoImg[][], { idx, cropItem }: ISetKitImages): IInfoImg[][] => {
  const newState = [...state];
  const currentKit = newState[idx];
  currentKit.push(cropItem!);
  newState.splice(idx, 1, currentKit);
  return newState;
};

export const setGeneratedKitImagesReducer = (state: IInfoImg[][], { kitImages, idx }: ISetKitImages): IInfoImg[][] => {
  if (kitImages?.length === 0) {
    return state;
  }
  const newState = [...state];
  newState.splice(idx, 1, kitImages!);
  return newState;
};

export const changeKitImagesReducer = (state: IInfoImg[][], { cropItem, idx, cropId }: ISetKitImages): IInfoImg[][] => {
  const newState = [...state];
  const currentKit = newState[idx];
  currentKit.splice(cropId!, 1, cropItem!);

  newState.splice(idx, 1, currentKit);
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
