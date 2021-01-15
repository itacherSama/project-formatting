import React from 'react';
import { useStore } from 'effector-react';
import Button from '@material-ui/core/Button';

import {
  $images, $kitsImages, $currentIdxKitImages, $modalState,
} from '../../effector/store';
import {
  setCurrentCropImage, setKitImages,
  nextKitImages, previousKitImages, activeModal, disableModal,
} from '../../effector/event';
import Gallery from '../../components/Gallery';
import Crop from '../../components/Crop';
import CustomModal from '../../components/CustomModal';
import SettingsImg from '../../components/SettingsImg';
import DownloadBtn from '../../components/DownloadBtn';
import styles from './ResizePage.module.css';
import { IobjIdxKitImages, IobjImg } from '../../interfaces/items';
import history from '../../router/history';

const ResizePage: React.FC = () => {
  const kitsImages = useStore($kitsImages);
  const images: IobjImg[] = useStore($images);
  const currentIdxKitImages: IobjIdxKitImages = useStore($currentIdxKitImages);
  const currentKitImg: IobjImg[] = kitsImages[currentIdxKitImages.idx];
  const currentImg: IobjImg = images[currentIdxKitImages.idx];
  const modalState: boolean = useStore($modalState);

  React.useEffect(() => {
    setCurrentCropImage(kitsImages[currentIdxKitImages.idx]);
  }, [currentIdxKitImages]);

  const onAddCropedImg = (img: IobjImg) => {
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

  if (!currentImg) {
    history.navigate('/');
    return null;
  }

  return (
    <>
      <div className={ styles.blockImg }>
        <img
          alt="main"
          src={ currentImg.preview }
        />
      </div>

      { !!currentKitImg
        && (
        <div className={ styles.kitImages }>
          <Gallery
            files={ currentKitImg }
            loadModal={ handleActiveModal }
          />
        </div>
        ) }

      <CustomModal
        onCloseModal={ handleCloseModal }
        open={ modalState }
      >
        <div className={ styles.cropContainer }>
          <div className={ styles.crop }>
            <Crop
              addCropedImg={ onAddCropedImg }
              onCloseModal={ handleCloseModal }
              src={ currentImg.preview! }
            />
          </div>
        </div>
      </CustomModal>

      <div className={ styles.buttons }>
        <Button
          color='primary'
          disabled={ currentIdxKitImages.idx === 0 }
          onClick={ onPreviousImage }
          variant='contained'
        >
          Назад
        </Button>
        <Button
          color='primary'
          disabled={ currentIdxKitImages.idx === currentIdxKitImages.maxIdx }
          onClick={ onNextImage }
          variant='contained'
        >
          Далее
        </Button>
      </div>

      <div className={ styles.settings }>
        <SettingsImg />
      </div>

      <div className={ styles.download }>
        <DownloadBtn />
      </div>
    </>
  );
};

export default ResizePage;
