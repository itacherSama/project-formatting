import React from 'react';
import { useStore } from 'effector-react';
import Button from '@material-ui/core/Button';
import { $isCroppedImages, $color, $quality } from '@effector/store';
import { downloadFiles } from '@services/fileService';
import { $kitsImages } from '@effector/stores/kitsImages';

const DownloadBtn = () => {
  const kitsImages = useStore($kitsImages);
  const isCroppedImages: boolean = useStore($isCroppedImages);
  const color: string = useStore($color);
  const quality: string = useStore($quality);
  const checkProperty: boolean = !(isCroppedImages && color && quality) as boolean;

  const onDownloadFiles = () => {
    downloadFiles(kitsImages);
  };

  return (
    <Button color="primary" disabled={checkProperty} variant="contained" onClick={onDownloadFiles}>
      Скачать изображения
    </Button>
  );
};

export default DownloadBtn;
