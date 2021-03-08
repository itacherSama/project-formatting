import { IImgCropSettings, IPointOnImg } from '../interfaces/items';

export const getImgFromPreviewFile = (preview: string): Promise<HTMLImageElement> => {
  return new Promise(function(resolve, reject) {
    const img: HTMLImageElement = new Image();
    img.onload = function() {
      resolve(img);
    };
    img.src = preview;
  });
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

export const calcPxFromPercent = (naturalSize: number, val: any): number => {
  const pixelVal = Math.round(naturalSize * (val / 100));
  return pixelVal;
};

export const calcPercentFromPx = (naturalSize: number, val: any): number => {
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

export const calcAspect = ( width: number, height: number): number | boolean => {
  if (height <= 0 || width <= 0) {
    return false;
  }
  const aspect = width / height;
  return aspect;
};

export const generateImagesBySettings = async (file: any, settings: any): Promise<any> => {
  const canvas = document.createElement('canvas');
  const img = await getImgFromPreviewFile(file.preview);

  canvas.width = settings.width;
  canvas.height = settings.height;

  const context = canvas.getContext("2d");

  context!.drawImage(
    img, 
    settings.x, 
    settings.y, 
    settings.width, 
    settings.height, 
    0,
    0,
    settings.width,
    settings.height
  );
  
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/jpeg', 1);
  });
};

export const getPositionByPoint = (data: IImgCropSettings, point: IPointOnImg, imgSettings: Cropper.ImageData) => {
  const pointFromPx = { 
    x: calcPxFromPercent(imgSettings.naturalWidth, point.x),
    y: calcPxFromPercent(imgSettings.naturalHeight, point.y) 
  };
  const halfWidth = data.width! / 2;
  const halfHeight = data.height! / 2;
  const newLeft = pointFromPx.x - halfWidth;
  const newTop = pointFromPx.y - halfHeight;

  return {
    ...data,
    x: newLeft >= 0 ? newLeft : 0,
    y: newTop >= 0 ? newTop : 0,
  };
};