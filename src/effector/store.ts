import { createStore, sample, guard, combine, restore, attach, merge } from 'effector';
import connectLocalStorage from 'effector-localstorage';
import * as events from './event';
import * as effects from './effect';
import { findNewCurrentIdx, deleteItemFromArrByIdx, setLengthKitsImagesFunc } from '../utils/differentFunc';
import { saveDataInLocalStorage } from '../services/localStorageService';
import { IobjIdxKitImages, IobjImg, ITypeCrop, IPointOnImg, ISettingsImage, ISettingsPointAndIdx } from '../interfaces/items';


const imagesLocalStorage = connectLocalStorage("images")
  .onError((err) => console.log(err));

const settingForKitsImagesLocalStorage = connectLocalStorage("settingForKitsImages")
  .onError((err) => console.log(err));  

export const $images = createStore<IobjImg[]>([])
  .on([events.setImages, effects.fetchImagesFx.doneData], (state, images) =>  [...images])
  .on(events.cancelImg, deleteItemFromArrByIdx);

export const $idxKitImages = createStore<IobjIdxKitImages>({ idx: 0, maxIdx: 0 })
  .on(events.setCurrentIdx, (state, length) => ({
    maxIdx: length - 1,
    idx: 0,
  }))
  .on(events.nextKitImages, (state) => findNewCurrentIdx(state, '+'))
  .on(events.previousKitImages, (state) => findNewCurrentIdx(state, '-'));

export const $kitsImages = createStore<IobjImg[][]>([])
  .on(events.setLengthKitsImages, (state, length) => setLengthKitsImagesFunc(state, length, []))
  .on(events.cancelImg, deleteItemFromArrByIdx)
  .on([events.setKitImages, effects.generateKitImagesByPoint.doneData], (state, { kitImages, idx }) => {
    if (kitImages.length === 0) {
      return state;
    }
    const newState = [...state];
    newState.splice(idx, 1, kitImages);

    return newState;
  })
  .on(events.setCancelCropImg, (state, { idx, idxImg }) => {
    const newState = [...state];
    const kitImages = newState[idx];
    kitImages.splice(idxImg, 1);
    
    return newState;
  })
  
  .on(effects.generateKitsImages.doneData, (state, kitsImages) => {
    let newState = [...state];
    newState = newState.map((el, idx) => {
      if (kitsImages[idx]) {
        return kitsImages[idx];
      }
      return el;
    });
    return newState;
  });

export const $kitsImagesSetting = createStore<any>([])
  .on(events.setKitImagesSettings, (state, { settingImg, idx }) => {
    const newState = [...state];
    newState[idx].items.push(settingImg);
    return newState;
  })
  .on(events.cancelImg, deleteItemFromArrByIdx)
  .on(events.setPointImgInKitImages, (state, { pointOnImg, idx }) => {
    const newState = [...state];
    const objSettings = newState[idx];
    objSettings.point = pointOnImg;
    
    return newState;
  })
  .on(events.setCancelCropImg, (state, { idx, idxImg }) => {
    const newState = [...state];
    const objSettings = newState[idx];
    objSettings.items.splice(idxImg, 1);
    
    return newState;
  })
  .on(effects.fetchSettingsForImagesFx.doneData, (state, dataFromLocalStorage) => dataFromLocalStorage)
  .on(events.setLengthKitsImages, ((state, length) => setLengthKitsImagesFunc(state, length, {
    point: null,
    items: []
  })));

sample({
  source: $idxKitImages,
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

sample({
  source: $idxKitImages,
  clock: events.setPointImg,
  fn: (objIdxCurrentImg: IobjIdxKitImages, pointOnImg: IPointOnImg) => ({ idx: objIdxCurrentImg.idx, pointOnImg }),
  target: events.setPointImgInKitImages,
});


const elementsForGenerateKitImagesByPoint = sample(combine([$idxKitImages, $images, $kitsImagesSetting]), events.setPointImg, 
  (arrayStores: any, pointOnImg: IPointOnImg) => {
    const idx = arrayStores[0].idx;
    return { 
      idx,
      fileImage: arrayStores[1][idx], 
      kitImagesSetting: arrayStores[2][idx], 
      pointOnImg,
    };
  }
);

guard({
  source: elementsForGenerateKitImagesByPoint,
  filter: ({ pointOnImg }) => pointOnImg !== null,
  target: effects.generateKitImagesByPoint,
});

$images.watch((state) => {
  events.setLengthKitsImages(state.length);
  events.setCurrentIdx(state.length);
  
  saveDataInLocalStorage('images', state, imagesLocalStorage);
});

$kitsImages.watch((state) => {
  const hasImages = state.some((kit: any) => kit.length);
  if (hasImages) {
    events.setIsCroppedImages(hasImages);
  }
});

$kitsImagesSetting.watch((state) => {
  if (state.length === 0) {
    return;
  }
  saveDataInLocalStorage('settingForKitsImages', state, settingForKitsImagesLocalStorage);

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
