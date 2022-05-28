import { createEvent } from 'effector-logger';
import {
  ICancelCropImg,
  ICropNewData,
  IInfoImg,
  IKitImageSettings,
  IPointImgInKitImages,
  IPointOnImg,
  ISetKitImages,
  ISettingImg,
  ISettingsImage,
} from 'interfaces/interfaces';
import { RefObject } from 'react';

export const setImages = createEvent<IInfoImg[]>();
export const setCurrentCropImage = createEvent<IInfoImg[]>();
export const setLengthKitsImages = createEvent<number>();
export const setKitImages = createEvent<ISetKitImages>();
export const nextKitImages = createEvent();
export const previousKitImages = createEvent();
export const setCurrentIdx = createEvent<number>();
export const activeModal = createEvent();
export const disableModal = createEvent();
export const setColor = createEvent<string>();
export const setQuality = createEvent<string>();
export const setIsCroppedImages = createEvent<boolean>();
export const cancelImg = createEvent<number>();
export const cancelCropImg = createEvent<number>();
export const setCancelCropImg = createEvent<ICancelCropImg>();
export const setTypeCrop = createEvent<string>();
export const setPointImg = createEvent<IPointOnImg>();
export const setPointImgInKitImages = createEvent<IPointImgInKitImages>();
export const addKitImageSettings = createEvent<IKitImageSettings>();
export const setActiveChangeSettings = createEvent<boolean>();
export const setCropDataPx = createEvent<ISettingImg>();
export const setCropDataPercent = createEvent<ICropNewData>();
export const setCropperRef = createEvent<RefObject<HTMLImageElement>>();
export const localStorageInit = createEvent();
export const fetchSettingsForImages = createEvent<Array<ISettingsImage>>();

export const setAspect = createEvent<any>();
export const cancelAspect = createEvent<any>();
