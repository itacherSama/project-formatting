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

export const setImages = createEvent<IInfoImg[]>('setImages');
export const setCurrentCropImage = createEvent<IInfoImg[]>('setCurrentCropImage');
export const setLengthKitsImages = createEvent<number>('setLengthKitsImages');
export const setKitImages = createEvent<ISetKitImages>('setKitImages');
export const nextKitImages = createEvent('nextKitImages');
export const previousKitImages = createEvent('previousKitImages');
export const setCurrentIdx = createEvent<number>('setCurrentIdx');
export const activeModal = createEvent('activeModal');
export const disableModal = createEvent('disableModal');
export const setColor = createEvent<string>('setColor');
export const setQuality = createEvent<string>('setQuality');
export const setIsCroppedImages = createEvent<boolean>('setIsCroppedImages');
export const cancelImg = createEvent<number>('cancelImg');
export const cancelCropImg = createEvent<number>('cancelCropImg');
export const setCancelCropImg = createEvent<ICancelCropImg>('setCancelCropImg');
export const setTypeCrop = createEvent<string>('setTypeCrop');
export const setPointImg = createEvent<IPointOnImg>('setPointImg');
export const setPointImgInKitImages = createEvent<IPointImgInKitImages>('setPointImgInKitImages');
export const addKitImageSettings = createEvent<IKitImageSettings>('addKitImageSettings');
export const setActiveChangeSettings = createEvent<boolean>('setActiveChangeSettings');
export const setCropDataPx = createEvent<ISettingImg>('setCropDataPx');
export const setCropDataPercent = createEvent<ICropNewData>('setCropDataPercent');
export const setCropperRef = createEvent<RefObject<HTMLImageElement>>('setCropperRef');
export const localStorageInit = createEvent('localStorageInit');
export const fetchSettingsForImages = createEvent<Array<ISettingsImage>>('fetchSettingsForImages');

export const setAspect = createEvent<any>('setAspect');
export const cancelAspect = createEvent<any>('cancelAspect');
