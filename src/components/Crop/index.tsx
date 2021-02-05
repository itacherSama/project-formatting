import React from 'react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import { useStore } from 'effector-react';
import CropForm from './CropForm';
import { $numberImg, $typeCrop } from '../../effector/store';
import { nextNumberImg } from '../../effector/event';
import { ICrop } from '../../interfaces/components';
import { IobjImg } from '../../interfaces/items';
import styles from './Crop.module.css';

const typeCropWords = ['px', '%', 'aspect'];

const Crop: React.FC<ICrop> = ({ addCropedImg, src, onCloseModal }) => {  
  const numberImg = useStore($numberImg);
  const typeCrop = useStore($typeCrop);
  const cropperRef = React.useRef<HTMLImageElement>(null);
  const [cropData, setCropData] = React.useState();
  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
      setCropData(cropper.getData({ rounded: true }));
  };

  const setMyDataCrop = (objValue: any) => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    cropper.setData({ ...objValue });
  };

  const setMyAspect = (data: number | boolean): void => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;

    const valueAspect = !data ? NaN : data;
    cropper.setAspectRatio(valueAspect);

  };

  return (
    <>
      <Cropper
        ref={ cropperRef }
        background={ false }
        // cropBoxMovable={ false }
        // cropBoxResizable={ false }
        // dragMode="none"
        crop={ onCrop }
        guides={ false }
        initialAspectRatio={ 1 }
        responsive
        src={ src }
        viewMode={ 1 }
        zoomable={ false }
      />

      <CropForm
        crop={ cropData }
        onSetAspect={ setMyAspect }
        onSetCrop={ setMyDataCrop }
        typeCrop={ typeCrop }
        typeCropWords={ typeCropWords }
      />
      
    </>
  );
};

export default Crop;
