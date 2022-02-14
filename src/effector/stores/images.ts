import { createStore, guard, sample } from 'effector';
import { convertAndSaveDataInLocalStorage } from '@services/localStorageService';
import { IInfoImg } from '@interfaces/interfaces';
import { $localStorageInited } from '@effector/store';
import { deleteItemFromArrByIdxReducer, setImagesReducer } from './reducers';
import * as effects from '../effect';
import * as events from '../event';

export const $images = createStore<IInfoImg[]>([])
  .on([events.setImages, effects.fetchImagesFx.doneData], setImagesReducer)
  .on(events.cancelImg, deleteItemFromArrByIdxReducer);

const checkLock = guard({
  source: [$images, $localStorageInited],
  filter: ([_, localStorageInited]) => localStorageInited,
});

sample({
  clock: checkLock,
  source: $images,
  fn: (images) => images.length,
  target: events.setLengthKitsImages,
});

$images.watch((state: IInfoImg[]) => {
  events.setCurrentIdx(state.length);
  // convertAndSaveDataInLocalStorage('images', state);
});
