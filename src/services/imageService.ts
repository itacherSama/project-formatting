import { ICropFormData, IPointOnImg, IImgSettingsNaturalSize, ISettingImg, IobjImg, ISettingsImage } from '../interfaces/items';

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

export const generateImagesBySettings = async (img: HTMLImageElement, settings: ISettingImg): Promise<any> => {
  const canvas = document.createElement('canvas');
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

export const getPositionByPoint = (data: ICropFormData, point: IPointOnImg, imgSettings: IImgSettingsNaturalSize) => {
  const pointFromPx = { 
    x: calcPxFromPercent(imgSettings.naturalWidth, point.x),
    y: calcPxFromPercent(imgSettings.naturalHeight, point.y) 
  };
  const halfWidth = data.width / 2;
  const halfHeight = data.height / 2;
  const newLeft = pointFromPx.x - halfWidth;
  const newTop = pointFromPx.y - halfHeight;

  return {
    ...data,
    x: newLeft >= 0 ? newLeft : 0,
    y: newTop >= 0 ? newTop : 0,
  };
};

export const getPositionByPointDouble = (data: ICropFormData, point: IPointOnImg, imgSettings: IImgSettingsNaturalSize) => {
  const pointFromPx = { 
    x: calcPxFromPercent(imgSettings.naturalWidth, point.x),
    y: calcPxFromPercent(imgSettings.naturalHeight, point.y) 
  };
  const halfWidth = data.width / 2;
  const halfHeight = data.height / 2;

  let newPoints: any = {
    newLeft : pointFromPx.x - halfWidth,
    newTop : pointFromPx.y - halfHeight,
    newRight : pointFromPx.x + halfWidth,
    newBot : pointFromPx.y + halfHeight,
  };

  if (imgSettings.naturalWidth < newPoints.newRight ) {
    const needPxW = newPoints.newRight - imgSettings.naturalWidth;
    const newRight = newPoints.newRight - needPxW;
    const newLeft = newPoints.newLeft - needPxW;
    newPoints = {
      ...newPoints, 
      newRight, newLeft
    };
  }

  if ( imgSettings.naturalHeight < newPoints.newBot ) {
    const needPxH =  newPoints.newBot - imgSettings.naturalHeight;
    const newBot = newPoints.newBot - needPxH;
    const newTop = newPoints.newTop - needPxH;
    newPoints = {
      ...newPoints, 
      newBot, newTop
    };
  }
  
  return {
    ...data,
    x: newPoints.newLeft >= 0 ? newPoints.newLeft : 0,
    y: newPoints.newTop >= 0 ? newPoints.newTop : 0,
  };
};


export const generateKitImages = async (imgElement: HTMLImageElement, kitSettings: ISettingsImage, newPoint?: IPointOnImg): Promise<IobjImg[]> => {
  const kitImages: IobjImg[] = [];
  for (let idxEl = 0; idxEl < kitSettings.items.length; idxEl++) {
    let settings = kitSettings.items[idxEl];
    if (newPoint) {
      settings = getPositionByPointDouble(settings, newPoint, imgElement);
    }
    const blobImg: Blob = await generateImagesBySettings(imgElement, settings);
    const fileImg: IobjImg = new File([blobImg], `${idxEl}.jpg`);
    fileImg.preview = URL.createObjectURL(fileImg);

    kitImages.push(fileImg);
  }
  return kitImages;
};

export const calcMinMaxValue = (first: number, second: number): number[] => {
  if (first > second) {
    [first, second] = [second, first];
  } 
  return [first, second];
};

export const calcWidthPoint = (firstObj: any, secondObj?: any) => {
  const defaultWidth = 3;
  let newWidth: any = null;

  if (!secondObj) {
    return defaultWidth;
  }

  const [minX, maxX] = calcMinMaxValue(firstObj.x, secondObj.x);
  const [minY, maxY] = calcMinMaxValue(firstObj.y, secondObj.y);

  newWidth = { 
    x: Math.round((maxX - minX)),
    y: Math.round((maxY - minY))
  };

  const [, maxNewWidth] = calcMinMaxValue(newWidth.x, newWidth.y);
  
  return Math.max(maxNewWidth, defaultWidth);

};

export const calcWidthPointOnCanvas = (widthPoint: number, canvas: any, func: any) => {
  const maxVal = Math.max(canvas.width, canvas.height);
  const widthPercent =  func(maxVal, widthPoint);
  return widthPercent;
};

export const calcPlacePoint = (start: any, end: any) => {
  const halfWidth = { 
    x: Math.round((end.x! - start.x!) / 2),
    y: Math.round((end.y! - start.y!) / 2)
  };

  const newPointPlace = {
    x: halfWidth.x + start.x!,
    y: halfWidth.y + start.y!
  };

  return newPointPlace;
};
