import { createStore, combine } from 'effector';
import * as events from './event';
import { getLocalImage, findNewCurrentIdx } from '../utils';

const images = localStorage.getItem('fileBase64');
// console.log(images);

getLocalImage(images, events.setImages);

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

$images.watch((state) => {
  events.setLengthKitsImages(state.length);
  events.setCurrentIdx(state.length);
});
