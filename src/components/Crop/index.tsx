import React from 'react';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

import { useStore } from 'effector-react';
import CropForm from './CropForm';
import { $numberImg, $typeCrop } from '../../effector/store';
import { nextNumberImg } from '../../effector/event';
import { ICrop } from '../../interfaces/components';
import { IImgCropSettings, IImgCropValue } from '../../interfaces/items';
import styles from './Crop.module.css';
import { getPxFromPercent, getPercentFromPx , getPositionByPoint } from '../../services/imageService';

const typeCropWords = ['px', '%', 'aspect'];

const Crop: React.FC<ICrop> = ({ addCropedImg, src, onCloseModal, point }) => {  
  const numberImg = useStore($numberImg);
  const typeCrop = useStore($typeCrop);
  const cropperRef = React.useRef<HTMLImageElement>(null);
  const [cropData, setCropData] = React.useState<any>(null);

  const getCropper = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;  

    return cropper;
  };

  const getPercentCropData = () => {
    if ( cropperRef.current && cropData.height && cropData.width) {
      return getPercentFromPx(cropperRef.current!, { ...cropData });
    }
    return cropData;
  };

  const valueCrop = typeCrop.current === typeCropWords[1] ? getPercentCropData() : cropData;
  
  const onCrop = () => {
    const cropper: any = getCropper();  
    const newData = cropper.getData({ rounded: true });
    
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

  const setMyDataCrop = (objValue: IImgCropValue) => {
    const cropper: any = getCropper();  
    const imgSettings = cropper.getImageData();
    const typeValue = objValue.type;
    let newData : any = { 
      [typeValue]: objValue.value
    };

    if (typeCrop.current === typeCropWords[1]) {
      newData = getPxFromPercent(cropperRef.current!, newData);
    }

    newData = {
      ...cropData,
      [typeValue]: newData[typeValue]
    };

    if (point) {
      newData = getPositionByPoint(newData, point, imgSettings);
    }

    cropper.setData({ ...newData });
  };

  const setMyAspect = (data: number): void => {
    const cropper: any = getCropper();

    // const cropper: any = getCropper();  
    // const valueAspect = !data ? NaN : data;
    // cropper.setAspectRatio(valueAspect);
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
    autoCrop: true,
    autoCropArea: 1,
  };

  const customSettingCropper = {
    center: false,
    cropBoxMovable: false,
    cropBoxResizable: false
  };

  return (
    <>
      <Cropper
        { ...baseSettingsCropper }
      />
      
      <CropForm
        crop={ valueCrop }
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
