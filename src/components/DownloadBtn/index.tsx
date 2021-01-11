import React from 'react';
import { useStore } from 'effector-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Button from '@material-ui/core/Button';
import {
  $kitsImages, $isCroppedImages, $color, $quality,
} from '../../effector/store';

const DownloadBtn: React.FC = () => {
  const kitsImages = useStore($kitsImages);
  const isCroppedImages = useStore($isCroppedImages);
  const color = useStore($color);
  const quality = useStore($quality);
  const checkProperty = !(isCroppedImages && color && quality);

  const downloadFiles = () => {
    const zip: JSZip = new JSZip();
    kitsImages.forEach((kit: any, idx: number) => {
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
  return (
    <Button
      color='primary'
      disabled={ checkProperty }
      onClick={ downloadFiles }
      variant='contained'
    >
      Скачать изображения

    </Button>
  );
};

export default DownloadBtn;
