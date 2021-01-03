import React from 'react';
import { useStore } from 'effector-react';
import JSZip from 'jszip';
import Button from '@material-ui/core/Button';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import {
  $images, $kitsImages, $currentIdxKitImages, $modalState,
} from '../../effector/store';
import {
  setCurrentCropImage, setKitImages,
  nextKitImages, previousKitImages, activeModal, disableModal,
} from '../../effector/event';
import Gallery from '../../components/Gallery';
import Crop from '../../components/Crop';
import ModalCrop from '../../components/ModalCrop';
import styles from './ResizePage.module.css';

const ResizePage = () => {
  const images = useStore($images);
  const kitsImages = useStore($kitsImages);
  const currentIdxKitImages = useStore($currentIdxKitImages);
  const currentKitImg = kitsImages[currentIdxKitImages.idx];
  const currentImg = images[currentIdxKitImages.idx];
  const modalState = useStore($modalState);

  React.useEffect(() => {
    setCurrentCropImage(kitsImages[currentIdxKitImages]);
  }, [currentIdxKitImages]);

  const onAddCropedImg = (img) => {
    setKitImages({ kitImages: [...currentKitImg, img], idx: currentIdxKitImages.idx });
  };

  const onPreviousImage = () => {
    previousKitImages();
  };

  const onNextImage = () => {
    nextKitImages();
  };

  const handleActiveModal = () => {
    activeModal();
  };

  const handleCloseModal = () => {
    disableModal();
  };

  const downloadFiles = () => {
    const zip = new JSZip();
    kitsImages.forEach((kit, idx) => {
      const newFolder = `image_${idx}`;
      const folder = zip.folder(newFolder);
      kit.forEach((img) => {
        folder.file(img.name, img, { binary: true });
      });
    });

    zip.generateAsync({ type: 'blob' })
      .then((blob) => {
        saveAs(blob, 'myImage.zip');
      });
  };

  if (!currentImg) {
    return <div />;
  }

  return (
    <>
      <div className={ styles.blockImg }>
        <img src={ currentImg.preview } />
      </div>

      {!!currentKitImg
        && <div className={ styles.kitImages }>
          <Gallery files={ currentKitImg } loadModal={ handleActiveModal } />
        </div>}

      <ModalCrop onCloseModal={ handleCloseModal } open={ modalState }>

        {currentImg.preview
      && <div className={ styles.crop }>
        <Crop
          addCropedImg={ onAddCropedImg }
          onCloseModal={ handleCloseModal }
          src={ currentImg.preview }
        />
      </div>}

      </ModalCrop>

      <div className="buttons">
        <Button
          color='primary'
          disabled={ currentIdxKitImages.idx === 0 }
          onClick={ onPreviousImage }
          variant='contained'
        >Назад
        </Button>
        <Button
          color='primary'
          disabled={ currentIdxKitImages.idx === currentIdxKitImages.maxIdx }
          onClick={ onNextImage }
          variant='contained'
        >Далее
        </Button>
      </div>

      <Button onClick={ downloadFiles }>Скачать изображения</Button>
    </>
  );
};

export default ResizePage;
