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

// const checkLock = guard({
//   source: [$images, $localStorageInited],
//   filter: ([_, localStorageInited]): boolean => localStorageInited,
// });

// sample({
//   clock: checkLock,
//   source: $images,
//   fn: (images: IInfoImg[]): number => images.length,
//   target: events.setLengthKitsImages,
// });

$images.watch((state: IInfoImg[]): void => {
  events.setCurrentIdx(state.length);
});

window.addEventListener('beforeunload', () => {
  convertAndSaveDataInLocalStorage('images', $images.getState());
});
