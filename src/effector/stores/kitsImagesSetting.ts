import { createStore } from 'effector';
import { ISettingsImage } from '@interfaces/interfaces';
import { saveDataInLocalStorage } from '@services/localStorageService';
import {
  addKitImageSettingsReducer,
  deleteItemFromArrByIdxReducer,
  getNewSettingsForKitImagesReducer,
  setCancelCropImgReducer,
  setLengthKitsImagesReducer,
  setPointImgInKitImagesReducer,
} from './reducers';
import * as events from '../event';
import * as effects from '../effect';

export const $kitsImagesSetting = createStore<ISettingsImage[]>([])
  .on(effects.getNewSettingsForKitImages.doneData, getNewSettingsForKitImagesReducer)
  .on(events.addKitImageSettings, addKitImageSettingsReducer)
  .on(events.cancelImg, deleteItemFromArrByIdxReducer)
  .on(events.setPointImgInKitImages, setPointImgInKitImagesReducer)
  .on(events.setCancelCropImg, setCancelCropImgReducer)
  .on(effects.fetchSettingsForImagesFx.doneData, (state, dataFromLocalStorage) => {
    return dataFromLocalStorage;
  })
  .on(events.setLengthKitsImages, setLengthKitsImagesReducer);

window.addEventListener('beforeunload', () => {
  saveDataInLocalStorage<ISettingsImage>('settingForKitsImages', $kitsImagesSetting.getState());
});
