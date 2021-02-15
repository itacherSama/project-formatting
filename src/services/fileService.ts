import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { IobjImg, IImageAndPoint } from '../interfaces/items';

export const downloadFiles = (kitsItems: IImageAndPoint[]): void => {
  const zip: JSZip = new JSZip();
  kitsItems.forEach((item: IImageAndPoint, idx: number) => {
    const { images: kit } = item;
    if (!kit.length) {
      return;
    }
    const newFolder = `image_${idx}`;
    const folder: JSZip | null = zip.folder(newFolder);
    kit.forEach((img: IobjImg) => {
      folder!.file(img.name!, img, { binary: true });
    });
  });

  zip.generateAsync({ type: 'blob' })
    .then((blob: Blob) => {
      saveAs(blob, 'myImage.zip');
    });
};


export const setFiles = (acceptedFiles: IobjImg[], oldFiles: IobjImg[], setImages: (images: IobjImg[]) => void): void => {
  const prevFiles = [...oldFiles];
  const newFiles = acceptedFiles.map((file: IobjImg) => Object.assign(file, {
    preview: URL.createObjectURL(file),
  }));

  const connectedFiles = prevFiles.concat(newFiles);
  setImages(connectedFiles);
};
