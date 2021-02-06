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
import { getPxFromPercent, getPercentFromPx } from '../../services/imageService';

const typeCropWords = ['px', '%', 'aspect'];

const Crop: React.FC<ICrop> = ({ addCropedImg, src, onCloseModal }) => {  
  const numberImg = useStore($numberImg);
  const typeCrop = useStore($typeCrop);
  const cropperRef = React.useRef<HTMLImageElement>(null);
  const [cropData, setCropData] = React.useState();
  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    let newData = cropper.getData({ rounded: true });
    
    if (typeCrop === typeCropWords[1]) {
      newData = getPercentFromPx(cropperRef.current!, newData);
    }

    setCropData(newData);

  };

  const setMyDataCrop = (objValue: any) => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;    
    let calcNewVal = objValue;

    if (typeCrop === typeCropWords[1]) {
      calcNewVal = getPxFromPercent(cropperRef.current!, calcNewVal);
    }

    cropper.setData({ ...calcNewVal });
  };

  const setMyAspect = (data: number | boolean): void => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;

    const valueAspect = !data ? NaN : data;
    cropper.setAspectRatio(valueAspect);
  };

  const baseSettingsCropper: any = {
    ref: cropperRef,
    background: false,
    crop: onCrop,
    guides: false,
    responsive: true,
    src,
    viewMode: 1,
    zoomable: false,
   };

   const customSettingCropper = {
    center: false,
    cropBoxMovable: false,
    cropBoxResizable: false
   }; 
   
   
   const MyCropper = React.useCallback(() => {
    return (
      <Cropper
        { ...baseSettingsCropper }
      />
     );
  }, [typeCrop]);

  return (
    <>
      <MyCropper />

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
