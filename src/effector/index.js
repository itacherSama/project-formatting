import { createStore, createEvent } from 'effector';

const images = localStorage.getItem('fileBase64');
// console.log(images);
export const setImages = createEvent();

export const $images = createStore([])
  .on(setImages, (state, images) => [...images]);
