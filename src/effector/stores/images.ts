import { createStore } from 'effector';
import * as events from "../event";
import * as effects from "../effect";
import {  deleteItemFromArrByIdx } from '../../utils/differentFunc';
import { saveDataInLocalStorage } from '../../services/localStorageService';
import { IobjImg } from '../../interfaces/items';
import { imagesLocalStorage } from '../store';



export const $images = createStore<IobjImg[]>([])
  .on([events.setImages, effects.fetchImagesFx.doneData], (state, images) =>  [...images])
  .on(events.cancelImg, deleteItemFromArrByIdx);

  
$images.watch((state) => {
  events.setLengthKitsImages(state.length);
  events.setCurrentIdx(state.length);
  
  saveDataInLocalStorage('images', state, imagesLocalStorage);
});