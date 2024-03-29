import { createStore } from 'effector-logger';
import { ISettingsImage } from 'interfaces/interfaces';
import { saveDataInLocalStorage } from 'services/localStorageService';
import {
  addKitImageSettingsReducer,
  deleteItemFromArrByIdxReducer,
  getNewSettingsForKitImagesReducer,
  setCancelSettingInKitsCropImgReducer,
  setLengthKitsImagesReducer,
  setPointImgInKitImagesReducer,
  changeKitImageSettingsReducer,
} from './reducers';
import * as events from '../event';
import * as effects from '../effect';

export const $kitsImagesSetting = createStore<ISettingsImage[]>([], {
  name: '$kitsImagesSetting',
})
  .on(effects.getNewSettingsForKitImages.doneData, getNewSettingsForKitImagesReducer)
  .on(events.addKitImageSettings, addKitImageSettingsReducer)
  .on(events.changeKitImageSettings, changeKitImageSettingsReducer)
  .on(events.cancelImg, deleteItemFromArrByIdxReducer)
  // .on(events.setPointImgInKitImages, setPointImgInKitImagesReducer)
  .on(events.setCancelCropImg, setCancelSettingInKitsCropImgReducer)
  .on(events.fetchSettingsForImages, (state, data: Array<ISettingsImage> | null) => {
    return data || state;
  })
  .on(events.setLengthKitsImages, setLengthKitsImagesReducer);

window.addEventListener('beforeunload', () => {
  saveDataInLocalStorage<ISettingsImage>('settingForKitsImages', $kitsImagesSetting.getState());
});

setInterval(() => {
  console.log('$kitsImagesSetting.getState()', $kitsImagesSetting.getState());
}, 5000);

$kitsImagesSetting.watch((state) => {
  console.log('$kitsImagesSetting state', state);
});
