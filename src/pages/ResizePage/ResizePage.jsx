import React from 'react';
import { useStore } from 'effector-react';
import Button from '@material-ui/core/Button';
import {
  $images, $kitsImages, $currentIdxKitImages,
} from '../../effector/store';
import {
  setCurrentCropImage, setKitImages,
  nextKitImages, previousKitImages,
} from '../../effector/event';
import Gallery from '../../components/Gallery';
import Crop from '../../components/Crop';
import styles from './ResizePage.module.css';

const ResizePage = () => {
  const images = useStore($images);
  const kitsImages = useStore($kitsImages);
  const currentIdxKitImages = useStore($currentIdxKitImages);
  const currentKitImg = kitsImages[currentIdxKitImages.idx];
  const currentImg = images[currentIdxKitImages.idx];
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

  return (
    <>
      {currentImg
        && <div className={ styles.blockImg }>
          <img src={ currentImg.preview } />
        </div>}

      {!!currentKitImg
        && <div className={ styles.kitImages }>
          <Gallery files={ currentKitImg } />
        </div>}
      {currentImg.preview
      && <div className={ styles.crop }>
        <Crop
          addCropedImg={ onAddCropedImg }
          src={ currentImg.preview }
        />
      </div>}

      <div className="buttons">
        <Button
          color='primary'
          onClick={ onPreviousImage }
          variant='contained'
        >Назад
        </Button>
        <Button
          color='primary'
          onClick={ onNextImage }
          variant='contained'
        >Далее
        </Button>
      </div>

    </>
  );
};

export default ResizePage;
