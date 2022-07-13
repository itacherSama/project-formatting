import { createStore, sample } from 'effector-logger';
import { IobjIdxKitImages, ICropFormDataAspect, ILoadState, IPointOnImg } from 'interfaces/interfaces';
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

sample({
  source: $idxKitImages,
  clock: events.setPointImg,
  fn: (objIdxCurrentImg: IobjIdxKitImages, pointOnImg: IPointOnImg) => ({ idx: objIdxCurrentImg.idx, pointOnImg }),
  target: events.setPointImgInKitImages,
});

export const $loadState = createStore<ILoadState>(
  {
    images: false,
    settings: false,
  },
  {
    name: '$loadState',
  }
)
  .on(events.fetchSettingsForImages, (state: ILoadState) => {
    return {
      ...state,
      settings: true,
    };
  })
  .on(effects.fetchImagesFx.done, (state: ILoadState) => {
    return {
      ...state,
      images: true,
    };
  });

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
