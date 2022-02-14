import { createStore, sample, guard, combine, restore } from 'effector';
import { setLengthKitsImagesFunc } from '@utils/differentFunc';
import { IInfoImg, IPointOnImg } from '@interfaces/interfaces';
import { deleteItemFromArrByIdxReducer } from '@effector/stores/reducers';
import * as events from '../event';
import * as effects from '../effect';
import { $idxKitImages } from './idxKitImages';
import { $images } from './images';
import { $kitsImagesSetting } from './kitsImagesSetting';
import { $stateCropPoint } from './stateCropPoint';

export const $kitsImages = createStore<IInfoImg[][]>([])
  .on(events.setLengthKitsImages, (state, length) => {
    return setLengthKitsImagesFunc(state, length, []);
  })
  .on(events.cancelImg, deleteItemFromArrByIdxReducer)
  .on([events.setKitImages, effects.generateKitImagesBySettings.doneData], (state, { kitImages, idx }) => {
    if (kitImages.length === 0) {
      return state;
    }
    const newState = [...state];
    newState.splice(idx, 1, kitImages);
    return newState;
  })
  .on(events.setCancelCropImg, (state, { idx, idxImg }) => {
    const newState = [...state];
    const kitImages = newState[idx];
    kitImages.splice(idxImg, 1);

    return newState;
  })
  .on(effects.generateKitsImages.doneData, (state, kitsImages) => {
    let newState = [...state];
    newState = newState.map((el, idx) => {
      if (kitsImages[idx]) {
        return kitsImages[idx];
      }
      return el;
    });
    return newState;
  });

guard({
  source: combine([restore(effects.fetchImagesFx, []), restore(effects.fetchSettingsForImagesFx, [])]),
  filter: (storeComb: any): any => {
    return storeComb[0].length && storeComb[1].length;
  },
  target: effects.generateKitsImages,
});

const elementsForGenerateSettingsByPoint = sample(
  combine([$idxKitImages, $images, $kitsImagesSetting]),
  events.setPointImg,
  (arrayStores: any, pointOnImg: IPointOnImg) => {
    const { idx } = arrayStores[0];

    return {
      idx,
      fileImage: arrayStores[1][idx],
      kitImagesSetting: arrayStores[2][idx],
      pointOnImg,
    };
  }
);

guard({
  source: elementsForGenerateSettingsByPoint,
  filter: ({ pointOnImg }) => pointOnImg !== null,
  target: effects.getNewSettingsForKitImages,
});

const elementsForGenerateKitImagesBySettings = sample(
  combine([$idxKitImages, $images, $kitsImagesSetting, $stateCropPoint]),
  $kitsImagesSetting,
  (arrayStores: any) => {
    const { idx } = arrayStores[0];
    return {
      idx,
      fileImage: arrayStores[1][idx],
      kitImagesSetting: arrayStores[2][idx],
      stateCropPoint: arrayStores[3],
    };
  }
);

guard({
  source: elementsForGenerateKitImagesBySettings,
  filter: ({ kitImagesSetting, stateCropPoint }) => kitImagesSetting?.point?.pointWidth !== null && stateCropPoint,
  target: effects.generateKitImagesBySettings,
});

$kitsImages.watch((state) => {
  const hasImages = state.some((kit: any) => kit.length);
  if (hasImages) {
    events.setIsCroppedImages(hasImages);
  }
});
