import { createEvent } from 'effector';

export const setImages = createEvent<any>();
export const setCurrentCropIdx = createEvent<any>();
export const setCurrentCropImage = createEvent<any>();
export const setNextImage = createEvent<any>();
export const setPreviousImage = createEvent<any>();
export const setLengthKitsImages = createEvent<any>();
export const setKitImages = createEvent<any>();
export const addCroppedImg = createEvent<any>();
export const nextKitImages = createEvent<any>();
export const previousKitImages = createEvent<any>();
export const setCurrentIdx = createEvent<any>();
export const activeModal = createEvent<any>();
export const disableModal = createEvent<any>();
export const nextNumberImg = createEvent<any>();
export const setColor = createEvent<any>();
export const setQuality = createEvent<any>();
export const setIsCroppedImages = createEvent<any>();
