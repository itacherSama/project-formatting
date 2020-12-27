import React from 'react';
import { useStore } from 'effector-react';
import Button from '@material-ui/core/Button';
import {
  $currentCropImage, setCurrentCropImage, $images, setKitImages,
} from '../../effector';
import BlockImg from '../../components/BlockImg';
import Gallery from '../../components/Gallery';
import Crop from '../../components/Crop';

import styles from './ResizePage.module.css';

const ResizePage = () => {
  const images = useStore($images);
  const image = useStore($currentCropImage);
  const [imageIdx, setImageIdx] = React.useState(0);

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

  return (
    <>
      <div>
        ResizePage
      </div>
      {!!image && <BlockImg file={ image } isImgSolo />}

      <div className={ styles.kitImages }>
        {images.length
        && <Gallery files={ images } />
      }
      </div>
      <div className={ styles.crop }>
        <Crop />
      </div>
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
