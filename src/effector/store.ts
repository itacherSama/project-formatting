import { createStore, sample, guard, combine, restore, attach, merge } from 'effector';
import connectLocalStorage from 'effector-localstorage';
import * as events from './event';
import * as effects from './effect';
import { findNewCurrentIdx, deleteItemFromArrByIdx, setLengthKitsImagesFunc } from '../utils/differentFunc';
import { saveDataInLocalStorage } from '../services/localStorageService';
import { IobjIdxKitImages, IobjImg, ITypeCrop, IPointOnImg, ISettingsImage, ISettingsPointAndIdx } from '../interfaces/items';
import { $idxKitImages } from './stores/idxKitImages';


export const imagesLocalStorage = connectLocalStorage("images")
  .onError((err) => console.log(err));

export const settingForKitsImagesLocalStorage = connectLocalStorage("settingForKitsImages")
  .onError((err) => console.log(err));  


sample({
  source: $idxKitImages,
  clock: events.cancelCropImg,
  fn: (objIdxCurrentImg: IobjIdxKitImages, currentCropImgIdx: number) => ({ idx: objIdxCurrentImg.idx, idxImg: currentCropImgIdx }),
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

export const $numberImg = createStore<number>(0)
  .on(events.nextNumberImg, (state) => state + 1);

export const $quality = createStore<string>('')
  .on(events.setColor, (state, color) => color);

export const $color = createStore<string>('')
  .on(events.setQuality, (state, quality) => quality);

export const $isCroppedImages = createStore<boolean>(false)
  .on(events.setIsCroppedImages, (state, flag) => flag);

export const $typeCrop = createStore<ITypeCrop>({ current: 'px', last: null })
  .on(events.setTypeCrop, (state, typeCrop) => {
    return {
      current: typeCrop,
      last: state.current
    };
  });


effects.fetchImagesFx(imagesLocalStorage.init([]));
effects.fetchSettingsForImagesFx(settingForKitsImagesLocalStorage.init([]));
