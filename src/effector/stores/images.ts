import { createStore, sample } from 'effector-logger';
import { convertAndSaveDataInLocalStorage } from 'services/localStorageService';
import { IInfoImg } from 'interfaces/interfaces';
import { deleteItemFromArrByIdxReducer, setImagesReducer } from './reducers';
import * as effects from '../effect';
import * as events from '../event';

export const $images = createStore<IInfoImg[]>([], {
  name: '$images',
})
  .on([events.setImages, effects.fetchImagesFx.doneData], setImagesReducer)
  .on(events.cancelImg, deleteItemFromArrByIdxReducer);

sample({
  source: $images,
  fn: (images: IInfoImg[]): number => {
    return images.length;
  },
  target: events.setLengthKitsImages,
});

$images.watch((state: IInfoImg[]): void => {
  events.setCurrentIdx(state.length);
});

window.addEventListener('beforeunload', () => {
  console.log('images', $images.getState());
  convertAndSaveDataInLocalStorage('images', $images.getState());
});
