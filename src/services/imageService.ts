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

export const calcPxCropFromPercent = (image: HTMLImageElement, crop: any) => {
  const pixelCrop = {
    x: Math.round(image.naturalWidth * (crop.x! / 100)),
    y: Math.round(image.naturalHeight * (crop.y! / 100)),
    width: Math.round(image.naturalWidth * (crop.width! / 100)),
    height: Math.round(image.naturalHeight * (crop.height! / 100)),
  };
  
  return pixelCrop;
};

// export const getCroppedImg = (image: HTMLImageElement, crop: any, fileName: string): Promise<IobjImg> => {
//   console.log('image', image);
//   console.log('naturalWidth', image.naturalWidth);
//   console.log('naturalHeight', image.naturalHeight);
//   console.log('width', image.width);
//   console.log('height', image.height);
  
//   const canvas: HTMLCanvasElement = document.createElement('canvas');
//   if (crop.unit === '%') {
//     crop = calcPxCropFromPercent(image, crop);  
//   }
//   const scaleX: number = image.naturalWidth / image.width;
//   const scaleY: number = image.naturalHeight / image.height;
//   canvas.width = Math.ceil(crop.width! * scaleX);
//   canvas.height = Math.ceil(crop.height! * scaleY);
//   const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d');

//   ctx!.drawImage(
//     image,
//     crop.x! * scaleX,
//     crop.y! * scaleY,
//     crop.width! * scaleX,
//     crop.height! * scaleY,
//     0,
//     0,
//     crop.width! * scaleX,
//     crop.height! * scaleY,
//   );

//   return new Promise((resolve) => {
//     canvas.toBlob((blob: IobjImg | null) => {
//       if (!blob) {
//         return;
//       }

//       blob.name = fileName;
      
//       blob.preview = window.URL.createObjectURL(blob);
//       resolve(blob);
//     }, 'image/jpeg');
//   });
// };