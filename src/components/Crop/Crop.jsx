import React from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { getCroppedImg } from '../../utils';

const Crop = ({ addCropedImg, src, mySizeCrop }) => {
  const [imageRef, setImageRef] = React.useState(null);
  const [crop, setCrop] = React.useState({
    unit: 'px',
  });

  React.useEffect(() => {
    setCrop({ ...crop, ...mySizeCrop });
  }, [mySizeCrop]);

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

  return (
    <>
      <ReactCrop
        crop={ crop }
        onChange={ onCropChange }
        onImageLoaded={ onImageLoaded }
        src={ src }

      />
      <div>Crop: {JSON.stringify(crop)}</div>
      <button onClick={ onCropComplete }>Сохранить</button>
    </>
  );
};

export default Crop;
