import { createStore, sample, guard, combine, restore } from 'effector';
import * as events from "../event";
import * as effects from "../effect";
import { deleteItemFromArrByIdx, setLengthKitsImagesFunc } from '../../utils/differentFunc';
import { IobjImg,  IPointOnImg } from '../../interfaces/items';
import { $idxKitImages } from './idxKitImages';
import { $images } from './images';
import { $kitsImagesSetting } from './kitsImagesSetting';



export const $kitsImages = createStore<IobjImg[][]>([])
  .on(events.setLengthKitsImages, (state, length) => setLengthKitsImagesFunc(state, length, []))
  .on(events.cancelImg, deleteItemFromArrByIdx)
  .on([events.setKitImages, effects.generateKitImagesByPoint.doneData], (state, { kitImages, idx }) => {
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
    console.log('filter');
    console.log(storeComb[0], 'ghffh', storeComb[1]);
    return storeComb[0].length && storeComb[1].length;
  },
  target: effects.generateKitsImages,
});

const elementsForGenerateKitImagesByPoint = sample(combine([$idxKitImages, $images, $kitsImagesSetting]), events.setPointImg,
  (arrayStores: any, pointOnImg: IPointOnImg) => {
    const idx = arrayStores[0].idx;
    return {
      idx,
      fileImage: arrayStores[1][idx],
      kitImagesSetting: arrayStores[2][idx],
      pointOnImg,
    };
  }
);

guard({
  source: elementsForGenerateKitImagesByPoint,
  filter: ({ pointOnImg }) => pointOnImg !== null,
  target: effects.generateKitImagesByPoint,
});



$kitsImages.watch((state) => {
  const hasImages = state.some((kit: any) => kit.length);
  if (hasImages) {
    events.setIsCroppedImages(hasImages);
  }
});
