import { calcPercentFromPx } from 'services/imageService';
import { createStore, forward } from 'effector';
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
    .on(effects.getNewSettingsForKitImages.doneData, (state, { transformedSettings, idx }) => {
        const newState = [...state];
        newState.splice(idx, 1, transformedSettings);

        return newState;
    })
    .on(events.addKitImageSettings, (state, { settingImg, idx, dataByNaturalSize }) => {
    const newState = [...state];

    const { naturalWidth, naturalHeight } = dataByNaturalSize;
    const percentData = {
      x: calcPercentFromPx(naturalWidth, settingImg.x),
      y: calcPercentFromPx(naturalHeight, settingImg.y),
      width: calcPercentFromPx(naturalWidth, settingImg.width),
      height: calcPercentFromPx(naturalHeight, settingImg.height),
    };

    newState[idx].items.push(percentData);
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
    console.log('dataFromLocalStorage', dataFromLocalStorage);
    return dataFromLocalStorage;
  })
  .on(events.setLengthKitsImages, (state, length) =>
    setLengthKitsImagesFunc(state, length, {
      point: initialStatePoint,
      items: [],
    })
  );

$kitsImagesSetting.watch((state) => {
    console.log('want to save settingForKitsImages', state);

    // saveDataInLocalStorage('settingForKitsImages', state);
});
