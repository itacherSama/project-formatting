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

export const getCroppedImg = (image: HTMLImageElement, crop: ReactCrop.Crop, fileName: string): Promise<IobjImg> => {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  console.log(image);
  
  const scaleX: number = image.naturalWidth / image.width;
  const scaleY: number = image.naturalHeight / image.height;
  canvas.width = crop.width!;
  canvas.height = crop.height!;
  const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

  ctx!.drawImage(
    image,
    crop.x! * scaleX,
    crop.y! * scaleY,
    crop.width! * scaleX,
    crop.height! * scaleY,
    0,
    0,
    crop.width!,
    crop.height!,
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob: IobjImg | null) => {
      if (!blob) {
        return;
      }

      blob.name = fileName;
      
      blob.preview = window.URL.createObjectURL(blob);
      resolve(blob);
    }, 'image/jpeg');
  });
};