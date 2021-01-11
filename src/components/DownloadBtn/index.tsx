import React from 'react';
import { useStore } from 'effector-react';
import Button from '@material-ui/core/Button';
import {
  $kitsImages, $isCroppedImages, $color, $quality,
} from '../../effector/store';
import { downloadFiles } from '../../services/downloadFileService';

const DownloadBtn: React.FC = () => {
  const kitsImages = useStore($kitsImages);
  const isCroppedImages = useStore($isCroppedImages);
  const color = useStore($color);
  const quality = useStore($quality);
  const checkProperty = !(isCroppedImages && color && quality);

  const onDownloadFiles = () => {
    downloadFiles(kitsImages);
  }
  
  return (
    <Button
      color='primary'
      disabled={ checkProperty }
      onClick={ onDownloadFiles }
      variant='contained'
    >
      Скачать изображения

    </Button>
  );
};

export default DownloadBtn;
