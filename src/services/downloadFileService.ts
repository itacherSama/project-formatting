import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { IobjImg } from '../interfaces/items';

export const downloadFiles = (kitsItems: any): void => {
  const zip: JSZip = new JSZip();
  kitsItems.forEach((kit: IobjImg[], idx: number) => {
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