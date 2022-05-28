import { createStore, sample } from 'effector-logger';
import { transformPxAndPercent, calcPercentFromPx, calcAspect } from 'services/imageService';
import { IobjIdxKitImages, ICropFormDataAspect, ICropFormData, ICropNewData } from 'interfaces/interfaces';
import { RefObject } from 'react';
import * as events from './event';
import * as effects from './effect';
import { $idxKitImages } from './stores/idxKitImages';

sample({
  source: $idxKitImages,
  clock: events.cancelCropImg,
  fn: (objIdxCurrentImg: IobjIdxKitImages, currentCropImgIdx: number) => ({
    idx: objIdxCurrentImg.idx,
    idxImg: currentCropImgIdx,
  }),
  target: events.setCancelCropImg,
});
/**/
// sample({
//   source: $idxKitImages,
//   clock: events.setPointImg,
//   fn: (objIdxCurrentImg: IobjIdxKitImages, pointOnImg: IPointOnImg) => ({ idx: objIdxCurrentImg.idx, pointOnImg }),
//   target: events.setPointImgInKitImages,
// });
/**/
export const $modalState = createStore<boolean>(false, {
  name: '$modalState',
})
  .on(events.activeModal, () => true)

  .on(events.disableModal, () => false);

export const $quality = createStore<string>('', {
  name: '$quality',
}).on(events.setColor, (state: string, color: string): string => color);

export const $color = createStore<string>('', {
  name: '$color',
}).on(events.setQuality, (state: string, quality: string): string => quality);

export const $isCroppedImages = createStore<boolean>(false, {
  name: '$isCroppedImages',
}).on(events.setIsCroppedImages, (state: boolean, flag: boolean) => flag);

export const $typeCrop = createStore<string>('px', {
  name: '$typeCrop',
}).on(events.setTypeCrop, (state: string, typeCrop: string): string => typeCrop);

// export const $aspect = createStore<ICropFormDataAspect>(
//   (function () {
//     const startValue = { width: 4, height: 3 };
//     return {
//       sides: startValue,
//       value: calcAspect(startValue),
//     };
//   })()
// ).on(events.setAspect, (state, newValue) => {
//   const newValues = { ...state.sides, ...newValue };
//
//   return { sides: newValues, value: calcAspect(newValues) };
// });

export const $aspect = createStore<ICropFormDataAspect>(
  {
    sides: { width: 4, height: 3 },
    value: 1,
  },
  {
    name: '$aspect',
  }
);

export const $cropDataPx = createStore<ICropFormData>(
  {
    width: 200,
    height: 200,
  },
  {
    name: '$cropDataPx',
  }
).on(
  events.setCropDataPx,
  (state: ICropFormData, newStateValue: ICropFormData): ICropFormData => ({
    ...state,
    ...newStateValue,
  })
);

export const $cropDataPercent = createStore<ICropFormData>(
  {
    width: 50,
    height: 50,
  },
  {
    name: '$cropDataPercent',
  }
);

export const $cropperRef = createStore<RefObject<HTMLImageElement>>(
  { current: null },
  {
    name: '$cropperRef',
  }
).on(events.setCropperRef, (state, data) => data);

$cropDataPx.on(events.setCropDataPx, (state, data) => ({ ...state, ...data }));
$cropDataPercent.on(events.setCropDataPercent, (state, data) => ({ ...state, ...data }));

sample({
  clock: events.setCropDataPx,
  fn: (cropZoneData: RefObject<HTMLImageElement>, cropData: ICropNewData): ICropNewData => {
    const value: ICropNewData = transformPxAndPercent(cropZoneData.current!, cropData, calcPercentFromPx);
    return value;
  },
  source: $cropperRef,
  target: events.setCropDataPercent,
});
