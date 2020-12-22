import { createStore, createEvent } from 'effector';

const images = localStorage.getItem('fileBase64');
// console.log(images);
export const setImages = createEvent();
export const setCurrentImage = createEvent();

fetch(images)
  .then((res) => res.blob())
  .then((blob) => {
    const file = new File([blob], 'File name', { type: 'image/png' });
    const newFiles = [file].map((file) => Object.assign(file, {
      preview: URL.createObjectURL(file),
    }));
    setImages([...newFiles, ...newFiles]);
  });

export const $images = createStore([])
  .on(setImages, (state, images) => [...images]);

export const $currentImage = createStore(null)
  .on(setCurrentImage, (state, image) => image);

$images.watch((state) => {
  const firstFile = state[0];
  setCurrentImage(firstFile);
});
