import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { IInfoImg } from 'interfaces/interfaces';

export const downloadFiles = (kitsItems: IInfoImg[][]): void => {
  const zip: JSZip = new JSZip();
  kitsItems.forEach((kit: IInfoImg[], idx: number) => {
    if (!kit.length) {
      return;
    }
    const newFolder = `image_${idx}`;
    const folder: JSZip | null = zip.folder(newFolder);
    kit.forEach((file: IInfoImg) => {
      folder!.file(file.infoByFile.name!, file.infoByFile, { binary: true });
    });
  });

  zip.generateAsync({ type: 'blob' }).then((blob: Blob) => {
    saveAs(blob, 'myImage.zip');
  });
};

export const setFiles = (
  acceptedFiles: File[],
  oldFiles: IInfoImg[],
  setImages: (images: IInfoImg[]) => void
): void => {
  const prevFiles = [...oldFiles];
  const newFiles = acceptedFiles.map((file: File) => ({ infoByFile: file, preview: URL.createObjectURL(file) }));

  const connectedFiles = prevFiles.concat(newFiles);
  setImages(connectedFiles);
};
