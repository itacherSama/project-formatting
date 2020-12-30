import React from 'react';
import { useStore } from 'effector-react';
import Button from '@material-ui/core/Button';
import {
  $currentCropImage, $images, $kitsImages,
} from '../../effector/store';
import {
  setCurrentCropImage, setKitImages,
} from '../../effector/event';
import Gallery from '../../components/Gallery';
import Crop from '../../components/Crop';
import styles from './ResizePage.module.css';

const ResizePage = () => {
  const images = useStore($images);
  const image = useStore($currentCropImage);
  // const kitsImages = useStore($kitsImages);
  const [imageIdx, setImageIdx] = React.useState(0);
  const [kitImages, setKitImages] = React.useState([]);

  const onChangeImg = (newIdx) => {
    const img = images[newIdx];
    if (!img) return;

    setCurrentCropImage(img);
    setImageIdx(newIdx);
  };

  const onNextImage = () => {
    const newIdx = imageIdx + 1;
    onChangeImg(newIdx);
  };

  const onPreviousImage = () => {
    const newIdx = imageIdx - 1;
    onChangeImg(newIdx);
  };

  const addCropedImg = (img) => {
    setKitImages([...kitImages, img]);
  };

  return (
    <>
      {!!image
        && <div className={ styles.blockImg }>
          <img src={ image.preview } />
        </div>}

      {kitImages.length
        && <div className={ styles.kitImages }>
          <Gallery files={ kitImages } />
        </div>}
      {image.preview
      && <div className={ styles.crop }>
        <Crop
          addCropedImg={ addCropedImg }
          src={ image.preview }
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
