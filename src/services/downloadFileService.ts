import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const downloadFiles = (kitsItems: any) => {
  const zip: JSZip = new JSZip();
  kitsItems.forEach((kit: any, idx: number) => {
    if (!kit.length) {
      return;
    }
    const newFolder = `image_${idx}`;
    const folder: any = zip.folder(newFolder);
    kit.forEach((img: any) => {
      folder.file(img.name, img, { binary: true });
    });
  });

  zip.generateAsync({ type: 'blob' })
    .then((blob) => {
      saveAs(blob, 'myImage.zip');
    });
};