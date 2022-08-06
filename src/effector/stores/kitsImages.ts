import { createStore, sample, combine, guard } from 'effector-logger';
import { setLengthKitsImagesFunc } from 'utils/differentFunc';
import { IInfoImg, IPointOnImg, ISettingsImage } from 'interfaces/interfaces';
import {
  deleteItemFromArrByIdxReducer,
  setKitImagesReducer,
  setCancelCropImgInKitsImagesReducer,
  setGeneratedKitsImagesReducer,
  changeKitImagesReducer,
  setGeneratedKitImagesReducer,
} from 'effector/stores/reducers';
import * as events from '../event';
import * as effects from '../effect';
import { $idxKitImages } from './idxKitImages';
import { $images } from './images';
import { $kitsImagesSetting } from './kitsImagesSetting';
import { $stateCropPoint } from './stateCropPoint';

export const $kitsImages = createStore<IInfoImg[][]>([], {
  name: '$kitsImages',
})
  .on(events.setLengthKitsImages, (state: IInfoImg[][], length: number) => {
    return setLengthKitsImagesFunc(state, length, []);
  })
  .on(events.cancelImg, deleteItemFromArrByIdxReducer)
  .on(events.setKitImages, setKitImagesReducer)
  .on(effects.generateKitImagesBySettings.doneData, setGeneratedKitImagesReducer)
  .on(events.changeKitImages, changeKitImagesReducer)
  .on(events.setCancelCropImg, setCancelCropImgInKitsImagesReducer)
  .on(effects.generateKitsImages.doneData, setGeneratedKitsImagesReducer);

guard({
  clock: events.localStorageInit,
  source: combine([$images, $kitsImagesSetting]),
  filter: (storeComb: [IInfoImg[], ISettingsImage[]]): boolean => Boolean(storeComb[0]?.length && storeComb[1]?.length),
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
  filter: ({ pointOnImg }): boolean => pointOnImg.pointWidth !== null,
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
  filter: ({ kitImagesSetting, stateCropPoint }) => {
    return kitImagesSetting?.point?.pointWidth !== null && stateCropPoint;
  },
  target: effects.generateKitImagesBySettings,
});

$kitsImages.watch((state) => {
  const hasImages = state.some((kit: any) => kit.length);
  if (hasImages) {
    events.setIsCroppedImages(hasImages);
  }
});
