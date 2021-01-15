import { IobjImg } from '../interfaces/items';

export const getWidthAndHeightFromFile = (file: IobjImg): {imgWidth: number, imgHeight: number } => {
  const img: HTMLImageElement = new Image();
  img.src = file.preview!;
  const imgWidth = img.width;
  const imgHeight = img.height;
  return { imgWidth, imgHeight };
};

export const setFiles = (acceptedFiles: IobjImg[], oldFiles: IobjImg[], setImages: (images: IobjImg[]) => void): void => {
  const prevFiles = [...oldFiles];
  const newFiles = acceptedFiles.map((file: IobjImg) => Object.assign(file, {
    preview: URL.createObjectURL(file),
  }));

  const connectedFiles = prevFiles.concat(newFiles);
  setImages(connectedFiles);
};
