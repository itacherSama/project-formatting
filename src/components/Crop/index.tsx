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

  const getCropper = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;  

    return cropper;
  };
  
  const onCrop = () => {
    const cropper: any = getCropper();  
    let newData = cropper.getData({ rounded: true });
    
    if (typeCrop.current === typeCropWords[1]) {
      newData = getPercentFromPx(cropperRef.current!, newData);
    }
    setCropData(newData);
  };

  const getCropImage = () => {
    const cropper: any = getCropper();  
    const cropperData = cropper.getData({ rounded: true });
    const dataByImg = {
      x: cropperData.x,
      y: cropperData.y,
      width: cropperData.width,
      height: cropperData.height,
    };
    const base64Img = cropper.getCroppedCanvas().toDataURL();

    addCropedImg(base64Img, dataByImg);
    onCloseModal();
  };

  const setMyDataCrop = (objValue: any) => {
    const cropper: any = getCropper();  
    let newData = objValue;
    if (typeCrop.current === typeCropWords[1]) {
      newData = getPxFromPercent(cropperRef.current!, newData);
    }
    cropper.setData({ ...newData });
  };

  const setMyAspect = (data: number): void => {
    const cropper: any = getCropper();  
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
    autoCropArea: 1
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
    }, [typeCrop]
   );

  return (
    <>
      <MyCropper />
      <CropForm
        crop={ cropData }
        getCropImage={ getCropImage }
        onSetAspect={ setMyAspect }
        onSetCrop={ setMyDataCrop }
        typeCrop={ typeCrop.current }
        typeCropWords={ typeCropWords }
      />
    </>
  );
};

export default Crop;
