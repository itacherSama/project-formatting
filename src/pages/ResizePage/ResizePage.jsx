import React from 'react';
import { useStore } from 'effector-react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
  $currentCropImage, $images, $kitsImages,
} from '../../effector/store';
import {
  setCurrentCropImage, setKitImages,
} from '../../effector/event';
import Gallery from '../../components/Gallery';
import Crop from '../../components/Crop';
import styles from './ResizePage.module.css';
import { doIfInteger } from '../../utils';

const ResizePage = () => {
  const images = useStore($images);
  const image = useStore($currentCropImage);
  // const kitsImages = useStore($kitsImages);
  const [imageIdx, setImageIdx] = React.useState(0);
  const [kitImages, setKitImages] = React.useState([]);
  const [mySizeCrop, setMySizeCrop] = React.useState(null);

  const setCropHeight = (e) => {
    const { value } = e.target;
    doIfInteger(value, setMySizeCrop, 'height', mySizeCrop);
  };

  const setCropWidth = (e) => {
    const { value } = e.target;
    doIfInteger(value, setMySizeCrop, 'width', mySizeCrop);
  };

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
      <div>
        ResizePage
      </div>
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
          mySizeCrop={ mySizeCrop }
          src={ image.preview }
        />
        <div className="controlSize">
          <form autoComplete="off" className={ styles.form } noValidate>
            <TextField label="Height" onChange={ setCropHeight } />
            <TextField label="Width" onChange={ setCropWidth } />

          </form>
        </div>
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
