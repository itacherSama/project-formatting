import {
  IAllNumber,
  ICropFormData,
  ICropNewData,
  IImgSettingsNaturalSize,
  IInfoImg,
  IPointOnImg,
  IPointPlace,
  ISettingImg,
  ISettingsImage,
  Nullable,
} from 'interfaces/interfaces';
import {
  checkCoordinates,
  checkDefaultSettingImg,
  checkPositionByPoint,
  checkProportions,
  throwErrorIfNull,
} from 'utils/differentFunc';

export const getImgFromPreviewFile = (preview: string): Promise<HTMLImageElement> =>
  new Promise((resolve) => {
    const img: HTMLImageElement = new Image();
    img.onload = () => {
      resolve(img);
    };
    img.src = preview;
  });

export const calcProportion = (firstArg: number, necessarySize: number, secondArg: number): number => {
  const propotion: number = Math.round(firstArg * (necessarySize / secondArg));
  return propotion;
};

export const getTypeByPropotion = (proportionWidth: number, proportionHeight: number, types: string[]): string => {
  if (proportionWidth / proportionHeight > 1) {
    return types[0];
  }
  return types[1];
};

export const calcPxFromPercent = (naturalSize: number, val: Nullable<number>): Nullable<number> => {
  if (val === null) {
    return val;
  }
  const pixelVal = Math.round(naturalSize * (val / 100));
  return pixelVal;
};

export const calcPercentFromPx = (naturalSize: number, val: Nullable<number>): Nullable<number> => {
  if (val === null) {
    return val;
  }
  const percentVal = Math.round((val / naturalSize) * 100);
  return percentVal;
};

export const transformPxAndPercent = (
  image: HTMLImageElement,
  objCrop: ICropNewData,
  fnTransform: (naturalSize: number, val: Nullable<number>) => Nullable<number>
): ICropNewData => {
  let height = null;
  let width = null;
  const transformedValues: ICropNewData = {};
  if (objCrop.height) {
    height = fnTransform(image.naturalHeight, objCrop.height);
    transformedValues.height = height;
  }
  if (objCrop.width) {
    width = fnTransform(image.naturalWidth, objCrop.width);
    transformedValues.width = width;
  }
  return transformedValues;
};

export const calcAspect = ({ width, height }: ICropFormData): Nullable<number> => {
  if (height === null || height <= 0 || width === null || width <= 0) {
    return 1;
  }
  const aspect = width / height;
  return aspect;
};

export const generateImageBySetting = async (img: HTMLImageElement, settings: ISettingImg): Promise<Blob | never> => {
  checkDefaultSettingImg(settings);
  const { width, height, x, y } = settings as unknown as IAllNumber;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');

  context!.drawImage(img, x, y, width, height, 0, 0, width, height);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        }
        reject();
      },
      'image/jpeg',
      1
    );
  });
};

export const getPositionByPoint = (
  data: ICropFormData,
  point: IPointOnImg,
  imgSettings: IImgSettingsNaturalSize,
  typeCrop: string
): ISettingImg => {
  const pointFromPx = {
    pointPlace: {
      x: calcPxFromPercent(imgSettings.naturalWidth, point.pointPlace.x),
      y: calcPxFromPercent(imgSettings.naturalHeight, point.pointPlace.y),
    },
    pointWidth: calcPxFromPercent(imgSettings.naturalHeight, point.pointWidth),
  };
  throwErrorIfNull(checkPositionByPoint(pointFromPx));
  throwErrorIfNull(checkProportions(data));

  const radius = pointFromPx.pointWidth!;
  const minSide = radius * 2;

  if (typeCrop === 'aspect') {
    if (data.width! < minSide || data.height! < minSide) {
      throw new Error();
    }
  }

  const newWidth = Math.max(minSide, data.width!);
  const newHeight = Math.max(minSide, data.height!);

  const newLeft = pointFromPx.pointPlace.x! - Math.round(newWidth / 2);
  const newTop = pointFromPx.pointPlace.y! - Math.round(newHeight / 2);
  return {
    ...data,
    width: newWidth,
    height: newHeight,
    x: newLeft >= 0 ? newLeft : 0,
    y: newTop >= 0 ? newTop : 0,
  };
};

export const getPositionByPointDouble = (
  data: ICropFormData,
  point: IPointOnImg,
  imgSettings: IImgSettingsNaturalSize
): ISettingImg => {
  const pointFromPx = {
    x: calcPxFromPercent(imgSettings.naturalWidth, point.pointPlace.x),
    y: calcPxFromPercent(imgSettings.naturalHeight, point.pointPlace.y),
  };

  const dataFromPx = {
    width: calcPxFromPercent(imgSettings.naturalWidth, data.width),
    height: calcPxFromPercent(imgSettings.naturalHeight, data.height),
  };

  throwErrorIfNull(checkDefaultSettingImg({ ...pointFromPx, ...dataFromPx }));
  const { x, y } = pointFromPx as unknown as IAllNumber;
  const { width, height } = dataFromPx as unknown as IAllNumber;
  const halfWidth = width / 2;
  const halfHeight = height / 2;

  let newPoints: IAllNumber = {
    newLeft: x - halfWidth,
    newTop: y - halfHeight,
    newRight: x + halfWidth,
    newBot: y + halfHeight,
  };

  if (imgSettings.naturalWidth < newPoints.newRight) {
    const needPxW = newPoints.newRight - imgSettings.naturalWidth;
    const newRight = newPoints.newRight - needPxW;
    const newLeft = newPoints.newLeft - needPxW;
    newPoints = {
      ...newPoints,
      newRight,
      newLeft,
    };
  }

  if (imgSettings.naturalHeight < newPoints.newBot) {
    const needPxH = newPoints.newBot - imgSettings.naturalHeight;
    const newBot = newPoints.newBot - needPxH;
    const newTop = newPoints.newTop - needPxH;
    newPoints = {
      ...newPoints,
      newBot,
      newTop,
    };
  }

  return {
    ...dataFromPx,
    x: newPoints.newLeft >= 0 ? newPoints.newLeft : 0,
    y: newPoints.newTop >= 0 ? newPoints.newTop : 0,
  };
};

export const generateKitImages = async (
  imgElement: HTMLImageElement,
  kitSettings: ISettingsImage
): Promise<IInfoImg[]> => {
  const { items } = kitSettings;
  const promises = items.map(async (settings: ISettingImg, idx: number): Promise<IInfoImg | null> => {
    try {
      const blobImg: Blob = await generateImageBySetting(imgElement, settings);
      const fileImg: IInfoImg = {
        infoByFile: new File([blobImg], `${idx}.jpg`),
      };
      fileImg.preview = URL.createObjectURL(fileImg.infoByFile);

      return fileImg;
    } catch (e) {
      console.log('ошибка создания набора картинок');
      return null;
    }
  });
  const filteredPromise: IInfoImg[] = await Promise.all(promises).then((data: Array<IInfoImg | null>) => {
    return data.filter((el: IInfoImg | null): boolean => el !== null) as IInfoImg[];
  });

  return filteredPromise;
};

export const generateNewSettingsForKitImages = (
  imgElement: HTMLImageElement,
  settings: ISettingImg[],
  newPoint: IPointOnImg
): ISettingsImage => {
  const newKitSettings: any[] = [];
  for (let idxEl = 0; idxEl < settings.length; idxEl++) {
    let currentSetting = settings[idxEl];
    try {
      currentSetting = getPositionByPointDouble(currentSetting, newPoint, imgElement);
      newKitSettings.push(currentSetting);
    } catch (e) {
      console.log('error getPositionByPoint');
    }
  }
  return {
    items: newKitSettings,
    point: newPoint,
  };
};

export const calcMinMaxValue = (first: number, second: number): number[] => {
  if (first > second) {
    return [second, first];
  }
  return [first, second];
};

export const calcWidthPoint = (firstObj: IPointPlace, secondObj?: IPointPlace): number => {
  const defaultWidth = 3;

  if (!secondObj) {
    return defaultWidth;
  }

  throwErrorIfNull(checkCoordinates(firstObj));
  throwErrorIfNull(checkCoordinates(secondObj));

  const [minX, maxX] = calcMinMaxValue(firstObj.x!, secondObj.x!);
  const [minY, maxY] = calcMinMaxValue(firstObj.y!, secondObj.y!);

  const newWidth = {
    x: Math.round(maxX - minX),
    y: Math.round(maxY - minY),
  };

  const [, maxNewWidth] = calcMinMaxValue(newWidth.x, newWidth.y);

  return Math.max(maxNewWidth, defaultWidth);
};

export const calcWidthPointOnCanvas = (
  pointWidth: number,
  canvas: HTMLCanvasElement,
  func: typeof calcPxFromPercent
): Nullable<number> => {
  // const maxVal = Math.max(canvas.width, canvas.height);
  const widthPercent = func(canvas.width, pointWidth);
  return widthPercent;
};

export const calcPlacePoint = (start: IPointPlace, end: IPointPlace): IPointPlace => {
  const halfWidth = {
    x: Math.round((end.x! - start.x!) / 2),
    y: Math.round((end.y! - start.y!) / 2),
  };

  const newPointPlace = {
    x: halfWidth.x + start.x!,
    y: halfWidth.y + start.y!,
  };

  return newPointPlace;
};

export const getPxWidthPoint = (pointWidth: number, canvas: HTMLCanvasElement): Nullable<number> => {
  const widthPointPx = calcWidthPointOnCanvas(pointWidth, canvas, calcPxFromPercent);
  const defaultWidthPoint = 3;

  if (widthPointPx === 0) {
    return defaultWidthPoint;
  }

  return widthPointPx;
};

export const calcPxStatePoint = (argStatePoint: IPointOnImg, canvas: HTMLCanvasElement): IPointOnImg => {
  const value = {
    pointPlace: {
      x: calcPxFromPercent(canvas.width, argStatePoint.pointPlace.x),
      y: calcPxFromPercent(canvas.height, argStatePoint.pointPlace.y),
    },
    pointWidth: getPxWidthPoint(argStatePoint.pointWidth!, canvas),
  };
  return value;
};

export const getWidthPoint = (firstObj: IPointPlace, secondObj?: IPointPlace): number => {
  const pointWidth = calcWidthPoint(firstObj, secondObj);
  // const widthPointPercent = calcWidthPointOnCanvas(pointWidth, canvasPreview.current, calcPercentFromPx);
  return pointWidth;
};

export const transformSettingsInPercent = (
  { items, point }: ISettingsImage,
  imgElement: HTMLImageElement
): ISettingsImage => {
  const changedItems = items.map(
    (el: ISettingImg): ISettingImg => ({
      x: calcPercentFromPx(imgElement.naturalWidth, el.x),
      y: calcPercentFromPx(imgElement.naturalHeight, el.y),
      width: calcPercentFromPx(imgElement.naturalWidth, el.width),
      height: calcPercentFromPx(imgElement.naturalHeight, el.height),
    })
  );

  return {
    point,
    items: changedItems,
  };
};

export const transformSettingsInPx = (
  { items, point }: ISettingsImage,
  imgElement: HTMLImageElement
): ISettingsImage => {
  const changedItems = items.map(
    (el: ISettingImg): ISettingImg => ({
      x: calcPxFromPercent(imgElement.naturalWidth, el.x),
      y: calcPxFromPercent(imgElement.naturalHeight, el.y),
      width: calcPxFromPercent(imgElement.naturalWidth, el.width),
      height: calcPxFromPercent(imgElement.naturalHeight, el.height),
    })
  );

  return {
    point,
    items: changedItems,
  };
};
