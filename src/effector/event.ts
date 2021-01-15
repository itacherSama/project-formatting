import { createEvent } from 'effector';
import { IobjImg } from '../interfaces/items';

export const setImages = createEvent<IobjImg[]>();
export const setCurrentCropImage = createEvent<IobjImg[]>();
export const setLengthKitsImages = createEvent<number>();
export const setKitImages = createEvent<any>();
export const nextKitImages = createEvent();
export const previousKitImages = createEvent();
export const setCurrentIdx = createEvent<number>();
export const activeModal = createEvent();
export const disableModal = createEvent();
export const nextNumberImg = createEvent();
export const setColor = createEvent<any>();
export const setQuality = createEvent<any>();
export const setIsCroppedImages = createEvent<boolean>();
