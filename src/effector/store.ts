import { createStore, sample, guard, combine, restore, forward } from 'effector';
import connectLocalStorage from 'effector-localstorage';
import { AnyARecord } from 'dns';
import * as events from './event';
import * as effects from './effect';
import { findNewCurrentIdx } from '../utils/differentFunc';
import { getLocalItems, saveDataInLocalStorage } from '../services/localStorageService';
import { IobjIdxKitImages, IobjImg, ITypeCrop, IImagesAndPoint } from '../interfaces/items';


const imagesLocalStorage = connectLocalStorage("images")
  .onError((err) => console.log(err));

const settingForKitsImagesLocalStorage = connectLocalStorage("settingForKitsImages")
  .onError((err) => console.log(err));  

export const $images = createStore<IobjImg[]>([])
  .on([events.setImages, effects.fetchImagesFx.doneData], (state, images) =>  [...images])
  .on(events.cancelImg, (state, idx) => {
    const newState = [...state];
    newState.splice(idx, 1);
    return newState;
  });


export const $currentIdxKitImages = createStore<IobjIdxKitImages>({ idx: 0, maxIdx: 0 })
  .on(events.setCurrentIdx, (state, length) => ({
    maxIdx: length - 1,
    idx: 0,
  }))
  .on(events.nextKitImages, (state) => findNewCurrentIdx(state, '+'))
  .on(events.previousKitImages, (state) => findNewCurrentIdx(state, '-'));

export const $kitsImages = createStore<IImagesAndPoint[]>([])
  .on(events.setLengthKitsImages, (state, length) => {
    const newState = [...state];
    if (length > state.length) {
      const needIncreaseLength = length - state.length;
      const newItems = new Array(needIncreaseLength).fill(
        { 
          images: [],
          point: null
        });
      newState.push(...newItems);
    }
    return newState;
  })
  .on(events.setKitImages, (state, { kitImages, idx }) => {
    const newState = [...state];
    newState.splice(idx, 1, kitImages);

    return newState;
  })
  .on(events.setCancelCropImg, (state, { idx, idxImg }) => {
    const newState = [...state];
    const kitImages = newState[idx];
    kitImages.images.splice(idxImg, 1);
    
    return newState;
  })
  .on(effects.generateKitsImages.doneData, (state, kitsImages) => {
    // console.log('kitsImages', kitsImages);
    
    let newState = [...state];
    newState = state.map((el, idx) => {
      if (kitsImages[idx]) {
        return kitsImages[idx];
      }
      return el;
    });
    return newState;
  });

sample({
  source: $currentIdxKitImages,
  clock: events.cancelCropImg,
  fn: (objIdxCurrentImg: IobjIdxKitImages, currentCropImgIdx: number) => ({ idx: objIdxCurrentImg.idx, idxImg: currentCropImgIdx }),
  target: events.setCancelCropImg,
});

guard({
  source: combine([restore(effects.fetchImagesFx, []), restore(effects.fetchSettingsForImagesFx, [])]),
  filter: (storeComb: any): any => {
    return storeComb[0].length && storeComb[1].length;
  },
  target: effects.generateKitsImages,
});


$images.watch((state) => {

  events.setLengthKitsImages(state.length);
  events.setCurrentIdx(state.length);
  
  saveDataInLocalStorage('images', state, imagesLocalStorage);
});

$kitsImages.watch((state) => {
  const hasImages = state.some((kit: IImagesAndPoint) => kit.images.length);
  if (hasImages) {
    events.setIsCroppedImages(hasImages);
    saveDataInLocalStorage('settingForKitsImages', state, settingForKitsImagesLocalStorage);
  }
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
