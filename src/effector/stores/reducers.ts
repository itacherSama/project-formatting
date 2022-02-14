import {
  ICancelCropImg,
  IInfoImg,
  IKitImageSettings,
  INewSettingsForKitImages,
  IPointImgInKitImages,
  ISettingsImage,
} from '@interfaces/interfaces';
import { calcPercentFromPx } from '@services/imageService';
import { copyObject, setLengthKitsImagesFunc } from '@utils/differentFunc';
import { initialStatePoint } from '@effector/stores/initStateStores';

export const getNewSettingsForKitImagesReducer = (
  state: ISettingsImage[],
  { transformedSettings, idx }: INewSettingsForKitImages
) => {
  console.log('getNewSettingsForKitImages');
  const newState = [...state];
  newState.splice(idx, 1, transformedSettings);

  return newState;
};

export const addKitImageSettingsReducer = (
  state: ISettingsImage[],
  { settingImg, idx, dataByNaturalSize }: IKitImageSettings
) => {
  const newState = [...state];
  console.log('addKitImageSettings');

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

export const setPointImgInKitImagesReducer = (state: ISettingsImage[], { pointOnImg, idx }: IPointImgInKitImages) => {
  const newState = [...state];
  const objSettings = newState[idx];

  if (pointOnImg) {
    objSettings.point = { ...pointOnImg };
  } else {
    objSettings.point = copyObject(initialStatePoint);
  }

  return newState;
};

export const setCancelCropImgReducer = (state: ISettingsImage[], { idx, idxImg }: ICancelCropImg) => {
  const newState = [...state];
  const objSettings = newState[idx];
  objSettings.items.splice(idxImg, 1);

  return newState;
};

export const setLengthKitsImagesReducer = (state: ISettingsImage[], length: number) => {
  return setLengthKitsImagesFunc(state, length, {
    point: initialStatePoint,
    items: [],
  });
};

export const setImagesReducer = (state: IInfoImg[], images: IInfoImg[]) => [...images];
