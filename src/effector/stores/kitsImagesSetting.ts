import { createStore } from 'effector';
import * as events from '../event';
import * as effects from '../effect';
import { copyObject, deleteItemFromArrByIdx, setLengthKitsImagesFunc } from '../../utils/differentFunc';
import { saveDataInLocalStorage } from '../../services/localStorageService';

const initialStatePoint = {
  pointWidth: null,
  pointPlace: {
    x: null,
    y: null,
  },
};

export const $kitsImagesSetting = createStore<any>([])
  .on(events.setKitsImagesSettings, (state, kits) => kits)
  .on(events.setKitImagesSettings, (state, { settingImg, idx }) => {
    const newState = [...state];
    newState[idx].items.push(settingImg);
    return newState;
  })
  .on(events.cancelImg, deleteItemFromArrByIdx)
  .on(events.setPointImgInKitImages, (state, { pointOnImg, idx }) => {
    const newState = [...state];
    const objSettings = newState[idx];

    if (pointOnImg) {
      objSettings.point = { ...pointOnImg };
    } else {
      objSettings.point = copyObject(initialStatePoint);
    }

    return newState;
  })
  .on(events.setCancelCropImg, (state, { idx, idxImg }) => {
    const newState = [...state];
    const objSettings = newState[idx];
    objSettings.items.splice(idxImg, 1);

    return newState;
  })
  .on(effects.fetchSettingsForImagesFx.doneData, (state, dataFromLocalStorage) => {
    return dataFromLocalStorage;
  })
  .on(events.setLengthKitsImages, (state, length) =>
    setLengthKitsImagesFunc(state, length, {
      point: initialStatePoint,
      items: [],
    })
  );

$kitsImagesSetting.watch((state) => {
  if (state.length !== 0) {
    saveDataInLocalStorage('settingForKitsImages', state);
  }
});
