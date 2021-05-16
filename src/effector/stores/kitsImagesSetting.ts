import { createStore } from 'effector';
import { settingForKitsImagesLocalStorage } from "../store";
import * as events from "../event";
import * as effects from "../effect";
import { deleteItemFromArrByIdx, setLengthKitsImagesFunc } from '../../utils/differentFunc';
import { saveDataInLocalStorage } from '../../services/localStorageService';


export const $kitsImagesSetting = createStore<any>([])
  .on(events.setKitImagesSettings, (state, { settingImg, idx }) => {
    const newState = [...state];
    newState[idx].items.push(settingImg);
    return newState;
  })
  .on(events.cancelImg, deleteItemFromArrByIdx)
  .on(events.setPointImgInKitImages, (state, { pointOnImg, idx }) => {
    const newState = [...state];
    const objSettings = newState[idx];
    objSettings.point = pointOnImg;
    
    return newState;
  })
  .on(events.setCancelCropImg, (state, { idx, idxImg }) => {
    const newState = [...state];
    const objSettings = newState[idx];
    objSettings.items.splice(idxImg, 1);
    
    return newState;
  })
  .on(effects.fetchSettingsForImagesFx.doneData, (state, dataFromLocalStorage) => dataFromLocalStorage)
  .on(events.setLengthKitsImages, ((state, length) => setLengthKitsImagesFunc(state, length, {
    point: {
      widthPoint: null,
      pointPlace: {
        x: null,
        y: null,
      },
    },
    items: []
  })));

$kitsImagesSetting.watch((state) => {
  if (state.length === 0) {
    return;
  }
  saveDataInLocalStorage('settingForKitsImages', state, settingForKitsImagesLocalStorage);
  
});