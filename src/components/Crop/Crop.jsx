import React from 'react';
import ReactCrop from 'react-image-crop';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import 'react-image-crop/dist/ReactCrop.css';
import { getCroppedImg } from '../../utils';
import styles from './Crop.module.css';

const Crop = ({ addCropedImg, src }) => {
  const [imageRef, setImageRef] = React.useState(null);
  const [crop, setCrop] = React.useState({
    unit: 'px',
  });

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const makeClientCrop = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageRef,
        crop,
        `newFile${Math.random()}.jpeg`,
      );
      addCropedImg({ preview: croppedImageUrl, imgWidth: crop.width, imgHeight: crop.height });
    }
  };

  const onImageLoaded = (image) => {
    setImageRef(image);
  };

  const onCropComplete = () => {
    makeClientCrop(crop);
  };

  const dischargeCrop = () => {
    setCrop({
      width: 0,
      height: 0,
      x: 0,
      y: 0,
    });
  };

  const setCropHeight = (e) => {
    const { value } = e.target;
    const height = parseInt(value);
    if (height) {
      const y = (imageRef.height - height) / 2;
      setCrop({
        ...crop,
        height,
        y,
      });
    }
  };

  const setCropWidth = (e) => {
    const { value } = e.target;
    const width = parseInt(value);
    if (width) {
      const x = (imageRef.width - width) / 2;
      setCrop({
        ...crop,
        width,
        x,
      });
    }
  };

  return (
    <>
      <ReactCrop
        crop={ crop }
        onChange={ onCropChange }
        onImageLoaded={ onImageLoaded }
        src={ src }

      />
      <div>Crop: {JSON.stringify(crop)}</div>
      <Button onClick={ onCropComplete }>Сохранить</Button>
      <div className="controlSize">
        <form autoComplete="off" className={ styles.form } noValidate>
          <TextField label="Height" onChange={ setCropHeight } />
          <TextField label="Width" onChange={ setCropWidth } />
          <Button label="Width" onClick={ dischargeCrop }>Отмена</Button>
        </form>
      </div>
    </>
  );
};

export default Crop;
