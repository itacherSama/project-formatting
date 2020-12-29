import { createStore } from 'effector';
import * as events from './event';
import { getLocalImage, toBase64 } from '../utils';

const images = localStorage.getItem('fileBase64');
// console.log(images);

getLocalImage(images, events.setImages);

export const $images = createStore([])
  .on(events.setImages, (state, images) => [...images]);

export const $currentCropImage = createStore(null)
  .on(events.setCurrentCropImage, (state, image) => image);

export const $kitsImages = createStore([])
  .on(events.setLengthKitsImages, (state, length) => new Array(length))
  .on(events.setKitImages, (state, { kitImages, idx }) => {
    const newState = [...state].splice(idx, 1, kitImages);
    return newState;
  });

$images.watch((state) => {
  events.setCurrentCropImage(state[0]);
  events.setLengthKitsImages(state.length);
});
