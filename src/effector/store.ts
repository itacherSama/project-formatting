import { createStore, sample } from 'effector';
import { getPercentFromPx } from 'services/imageService';
import * as events from './event';
import * as effects from './effect';
import { IobjIdxKitImages, ITypeCrop, IPointOnImg, ICropFormData } from '../interfaces/items';
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
  .on(events.activeModal, () => true)

  .on(events.disableModal, () => false);

export const $numberImg = createStore<number>(0).on(events.nextNumberImg, (state) => state + 1);

export const $quality = createStore<string>('').on(events.setColor, (state, color) => color);

export const $color = createStore<string>('').on(events.setQuality, (state, quality) => quality);

export const $isCroppedImages = createStore<boolean>(false).on(events.setIsCroppedImages, (state, flag) => flag);

export const $isLocalDataLoaded = createStore<boolean>(false).on(events.setIsLocalDataLoaded, (state, flag) => flag);

export const $typeCrop = createStore<ITypeCrop>({ current: 'px', last: null }).on(
  events.setTypeCrop,
  (state, typeCrop) => ({
      current: typeCrop,
      last: state.current,
    })
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

export const $aspect = createStore<ICropFormData>({
  width: 4,
  height: 3,
});

export const $cropDataPx = createStore<any>({
  width: 200,
  height: 200,
}).on(events.setCropDataPx, (state, newStateValue) => ({
  ...state, 
  ...newStateValue,
}));

export const $cropDataPercent = createStore<any>({
  width: 4,
  height: 3,
});

export const $cropperRef = createStore<any>(null);

$cropDataPx.on(events.setCropDataPx, (state, data) => ({ ...state, ...data }));
$cropDataPercent.on(events.setCropDataPercent, (state, data) => ({ ...state, ...data }));
$cropperRef.on(events.setCropperRef, (state, data) => data);

sample({
  clock: events.setCropDataPx,
  source: $cropperRef,
  fn: (cropZoneData, cropData) => {
    const value = getPercentFromPx(cropZoneData.current, { ...cropData });
    return value;
  },
  target: events.setCropDataPercent,
});