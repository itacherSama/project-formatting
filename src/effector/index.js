import { createStore, createEvent } from 'effector';
import { getLocalImage } from '../utils';

const images = localStorage.getItem('fileBase64');
// console.log(images);
export const setImages = createEvent();
export const setCurrentCropIdx = createEvent();
export const setCurrentCropImage = createEvent();
export const setNextImage = createEvent();
export const setPreviousImage = createEvent();
export const setLengthKitsImages = createEvent();
export const setKitImages = createEvent();

getLocalImage(images, setImages);

export const $images = createStore([])
  .on(setImages, (state, images) => [...images]);

export const $currentCropImage = createStore(null)
  .on(setCurrentCropImage, (state, image) => image);

// export const $kitsImages = createStore(null)
//   .on(setLengthKitsImages, (state, length) => new Array(length))
//   .on(setKitImages, (state, kitImages, idx) => {
//     console.log(idx);
//     return [...state, kitImages];
//   });

$images.watch((state) => {
  setCurrentCropImage(state[0]);
  setLengthKitsImages(state.length);
});
