import { createStore } from 'effector';
import * as events from './event';
import { findNewCurrentIdx } from '../utils';

/* const images = localStorage.getItem('fileBase64');
getLocalImage(images, events.setImages); */

export const $images = createStore([])
  .on(events.setImages, (state, images) => [...images]);

export const $currentIdxKitImages = createStore({ idx: 0 })
  .on(events.setCurrentIdx, (state, length) => ({
    maxIdx: length - 1,
    idx: 0,
  }))
  .on(events.nextKitImages, (state) => findNewCurrentIdx(state, '+'))
  .on(events.previousKitImages, (state) => findNewCurrentIdx(state, '-'));

export const $kitsImages = createStore([])
  .on(events.setLengthKitsImages, (state, length) => new Array(length).fill([]))
  .on(events.setKitImages, (state, { kitImages, idx }) => {
    const newState = [...state];
    newState.splice(idx, 1, kitImages);

    return newState;
  });

export const $modalState = createStore(false)
  .on(events.activeModal, (state) => true)
  .on(events.disableModal, (state) => false);

export const $numberImg = createStore(0)
  .on(events.nextNumberImg, (state) => state + 1);

export const $quality = createStore('')
  .on(events.setColor, (state, color) => color);

export const $color = createStore('')
  .on(events.setQuality, (state, quality) => quality);

$images.watch((state) => {
  events.setLengthKitsImages(state.length);
  events.setCurrentIdx(state.length);
});
