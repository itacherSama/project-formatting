import { IobjImg } from '../interfaces/items';

export const getWidthAndHeightFromFile = (file: IobjImg): {imgWidth: number, imgHeight: number } => {
  const img: HTMLImageElement = new Image();
  img.src = file.preview!;
  const imgWidth = img.width;
  const imgHeight = img.height;
  return { imgWidth, imgHeight };
};

export const calcProportion = (firstArg: number, necessarySize: number, secondArg: number): number => {
  const propotion: number = Math.round(firstArg * (necessarySize / secondArg));
  return propotion;
};

export const getTypeByPropotion = (proportionWidth: number, proportionHeight: number, types: string[]): string => {
  if ((proportionWidth / proportionHeight) > 1) {
    return types[0];
  } else {
    return types[1];
  }
};

export const calcPxFromPercent = (naturalSize: number, val: any) => {
  const pixelVal = Math.round(naturalSize * (val / 100));
  return pixelVal;
};

export const calcPercentFromPx = (naturalSize: number, val: any) => {
  const percentVal =  Math.round((val / naturalSize) * 100);
  return percentVal;
};

export const getPxFromPercent = (image: HTMLImageElement, objCrop: any) => {
  objCrop.width = calcPxFromPercent(image.naturalWidth, objCrop.width);
  objCrop.height = calcPxFromPercent(image.naturalHeight, objCrop.height);
    
  return objCrop;
};

export const getPercentFromPx = (image: HTMLImageElement, objCrop: any) => {
  objCrop.width = calcPercentFromPx(image.naturalWidth, objCrop.width);
  objCrop.height = calcPercentFromPx(image.naturalHeight, objCrop.height);

  return objCrop;
};