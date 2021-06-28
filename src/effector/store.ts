import { createStore, sample } from 'effector';
import * as events from './event';
import * as effects from './effect';
import { IobjIdxKitImages, ITypeCrop, IPointOnImg } from '../interfaces/items';
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

export const $modalState = createStore<boolean>(false)
  .on(events.activeModal, (state) => true)

  .on(events.disableModal, (state) => false);

export const $numberImg = createStore<number>(0).on(events.nextNumberImg, (state) => state + 1);

export const $quality = createStore<string>('').on(events.setColor, (state, color) => color);

export const $color = createStore<string>('').on(events.setQuality, (state, quality) => quality);

export const $isCroppedImages = createStore<boolean>(false).on(events.setIsCroppedImages, (state, flag) => flag);

export const $isLocalDataLoaded = createStore<boolean>(false).on(events.setIsLocalDataLoaded, (state, flag) => flag);

export const $typeCrop = createStore<ITypeCrop>({ current: 'px', last: null }).on(
  events.setTypeCrop,
  (state, typeCrop) => {
    return {
      current: typeCrop,
      last: state.current,
    };
  }
);

const getValueLS = async (key: string, cb: any) => {
  const val = await localStorage.getItem(key);
  if (typeof val === 'string') {
    const objVal = JSON.parse(val);
    cb(objVal);
  }
};

getValueLS('images', effects.fetchImagesFx);
getValueLS('settingForKitsImages', effects.fetchSettingsForImagesFx);
