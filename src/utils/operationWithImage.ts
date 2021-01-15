import { IobjImg } from '../interfaces/items';

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

export const getCroppedImg = (image: HTMLImageElement, crop:any, fileName: string): Promise<IobjImg> => {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const scaleX: number = image.naturalWidth / image.width;
  const scaleY: number = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx: any = canvas.getContext('2d');

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  );

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob: Blob | null) => {
      if (!blob) {
        return;
      }

      const blobWithOptions: IobjImg = blob;
      blobWithOptions.name = fileName;
      blobWithOptions.preview = window.URL.createObjectURL(blob);
      resolve(blob);
    }, 'image/jpeg');
  });
};