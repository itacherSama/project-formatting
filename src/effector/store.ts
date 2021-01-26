import { createStore, sample } from 'effector';
import * as events from './event';
import { findNewCurrentIdx } from '../utils/differentFunc';
import { IobjIdxKitImages, IobjImg } from '../interfaces/items';

export const $images = createStore<IobjImg[]>([])
  .on(events.setImages, (state, images) =>  [...images])
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

export const $kitsImages = createStore<IobjImg[][]>([])
  .on(events.setLengthKitsImages, (state, length) => new Array(length).fill([]))
  .on(events.setKitImages, (state, { kitImages, idx }) => {
    const newState = [...state];
    newState.splice(idx, 1, kitImages);

    return newState;
  })
  .on(events.setCancelCropImg, (state, { idx, idxImg }) => {
    const newState = [...state];
    const kitImages = newState[idx];
    kitImages.splice(idxImg, 1);
    
    return newState;
  });

  sample({
    source: $currentIdxKitImages /* 2 */,
    clock: events.cancelCropImg /* 1 */,
    fn: (objIdxCurrentImg: IobjIdxKitImages, currentCropImgIdx: number) => ({ idx: objIdxCurrentImg.idx, idxImg: currentCropImgIdx }) /* 3 */,
    target: events.setCancelCropImg /* 4 */,
  });

$images.watch((state) => {
  events.setLengthKitsImages(state.length);
  events.setCurrentIdx(state.length);
});

$kitsImages.watch((state) => {
  const hasImages = state.some((kit: IobjImg[]) => kit.length);
  events.setIsCroppedImages(hasImages);
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