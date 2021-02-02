import React from 'react';
import ReactCrop from 'react-image-crop';
import { useStore } from 'effector-react';
import CropForm from './CropForm';
import 'react-image-crop/dist/ReactCrop.css';
import { getCroppedImg } from '../../services/imageService';
import { $numberImg, $typeCrop } from '../../effector/store';
import { nextNumberImg } from '../../effector/event';
import { ICrop } from '../../interfaces/components';
import { IobjImg, IMyCustomCrop } from '../../interfaces/items';
import styles from './Crop.module.css';

const typeCropWords = ['px', '%', 'aspect'];

const Crop: React.FC<ICrop> = ({ addCropedImg, src, onCloseModal }) => {  
  const [imageRef, setImageRef] = React.useState<any>(null);
  const numberImg = useStore($numberImg);
  const typeCrop = useStore($typeCrop);
  const [crop, setCrop] = React.useState<IMyCustomCrop>({
    unit: '%',
    width: 50,
    height: 50,
  });

  const onCropChange = (newCrop: IMyCustomCrop, cropPercent: IMyCustomCrop): void => {
    console.log('onCropChange', newCrop);
    console.log('onCropChange', cropPercent);
    
    setCrop((prevCrop: IMyCustomCrop) => {
      let newCropState;
      if (typeCrop === typeCropWords[1] && cropPercent ) {
        newCropState = {
          ...prevCrop,
          ...cropPercent,
        };
      } else {
        newCropState = { 
          ...prevCrop,
        ...newCrop
        };
      }
      
      return {
        ...newCropState
      };
    });
  };

  const makeClientCrop = async (crop: IMyCustomCrop) => {
    if (imageRef && crop.width && crop.height) {
      const blobObj: IobjImg = await getCroppedImg(imageRef, crop, `${numberImg}.jpeg`);
      blobObj.imgWidth = crop.width;
      blobObj.imgHeight = crop.height;
      
      addCropedImg(blobObj);
    }
  };

  const onImageLoaded = (image: HTMLImageElement): void => {
    setImageRef(image);
  };

  const onCropComplete = (): void => {
    makeClientCrop(crop);
    nextNumberImg();
    onCloseModal();
  };

  return (
    <>
      <ReactCrop
        crop={ crop }
        onChange={ onCropChange }
        onComplete={ (el, el2) => {
          console.log('onComplete', el);
          console.log('onComplete', el2);
          
        } }
        onImageLoaded={ onImageLoaded }
        src={ src }
      />
      <CropForm
        crop={ crop }
        imageRef={ imageRef }
        onCropComplete={ onCropComplete }
        setCrop={ onCropChange }
        typeCrop={ typeCrop }
        typeCropWords={ typeCropWords }
      />
      
    </>
  );
};

export default Crop;
