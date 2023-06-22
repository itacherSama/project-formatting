/*eslint-disable*/
import React, { useCallback, useEffect, useRef, useState, memo } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';

import 'cropperjs/dist/cropper.css';

import {
  ICropFormData,
  ICropNewData,
  IImgSettingsNaturalSize,
  IPointOnImg,
  ISettingImgWithNulable,
  ICropFormDataAspect,
} from 'interfaces/interfaces';
import { transformPxAndPercent, calcPercentFromPx, calcAspect, transformSettingInPx } from 'services/imageService';
import CropForm from './CropForm';
import { TypeCrop } from '../../messages';
import CropService from '../../services/cropService';

type Props = {
  src: string;
  point: IPointOnImg;
  addCropedImg: (
    base64Img: string,
    settingImg: ISettingImgWithNulable,
    dataByNaturalSize: IImgSettingsNaturalSize
  ) => void;
  onCloseModal: () => void;
  setting: ISettingImgWithNulable | null;
  resetCurrentChangeCrop: () => void;
};

const Crop = ({ addCropedImg, src, onCloseModal, point, setting, resetCurrentChangeCrop }: Props) => {
  const cropperRef = useRef<ReactCropperElement>(null);
  const typeCropRef = useRef(TypeCrop.px);
  const changeActiveRef = useRef(false);
  const [cropReady, setCropReady] = useState(false);
  console.log('Crop setting', setting);
  const [typeCropState, setTypeCrop] = useState(TypeCrop.px);
  const cropperServiceRef = useRef(new CropService(cropperRef, typeCropRef, changeActiveRef));
  const cropperService = cropperServiceRef.current;


  useEffect(() => {
    typeCropRef.current = typeCropState;
  }, [typeCropState]);

  const [cropBoxDataPx, setCropDataPx] = useState<ICropFormData>({
    width: 200,
    height: 200,
  });

  const [cropBoxDataPercent, setCropDataPercent] = useState<ICropFormData>({ width: 50, height: 50 });

  const [aspect, setCropAspect] = useState<ICropFormDataAspect>(() => {
    const startValue = { width: 4, height: 3 };
    return {
      sides: startValue,
      value: calcAspect(startValue),
      used: false,
    };
  });

  useEffect(() => {
    const cropper = cropperService.getCropper();
    if (cropper) {
      const natutalSize = cropper.getImageData();

      if (typeCropRef.current === TypeCrop.aspect) {
        cropper
          // .setAspectRatio(aspect.value)
          .setData({ width: natutalSize.naturalWidth, height: natutalSize.naturalHeight });
      }
    }
  }, [typeCropState, aspect]);

  useEffect(() => {
    if (setting) {
      const transformedData = cropperService.onChangeSettings(setting);
      setCropDataPx(transformedData);
    }
  }, [setting, cropReady]);

  useEffect(() => {
    return () => {
      resetCurrentChangeCrop();
    };
  }, [resetCurrentChangeCrop]);

  const calcPercentCropData = (cropData: ICropNewData) => {
    const value = transformPxAndPercent(cropperRef.current!, cropData, calcPercentFromPx) as ICropFormData;
    setCropDataPercent(value);
  };

  const calcAspectCropData = useCallback((newValue: any) => {
    setCropAspect((prevState) => {
      const newValues = { ...prevState.sides, ...newValue };

      return { sides: newValues, value: calcAspect(newValues), used: true };
    });
  }, []);

  const onCrop = useCallback(() => {
    const newValues = cropperService.onCrop(point, cropBoxDataPx);
    console.log('newValues', newValues)
    if (newValues) {
      calcPercentCropData(newValues);
      setCropDataPx(newValues);
    }
  }, [point, cropBoxDataPx]);

  const onSetCrop = useCallback((newValue: ICropNewData) => {
    cropperService.onSetCrop(point, newValue, cropBoxDataPx);
  }, []);

  const getCropImage = useCallback(() => {
    cropperService.getCropImage(addCropedImg);
    onCloseModal();
  }, []);

  const onTypeCrop = useCallback((newType: TypeCrop): void => {
    cropperService.onTypeCrop(newType, cropBoxDataPx);
    setTypeCrop(newType);
  }, []);

  const [optionsCropper, setOptionsCropper] = useState({
    autoCropArea: 0.5,
    background: false,
    crop: onCrop,
    guides: false,
    src,
    viewMode: 1 as Cropper.ViewMode,
    zoomable: false,
    autoCrop: true,
    responsive: true,
    ready: () => {
      setCropReady(true);
      cropperService.transformDataByPointCrop(point);
    },
  });
  return (
    <>
      {!cropReady && <div>Loading</div>} {/*сделать нормальный лоадер*/}
      <Cropper ref={cropperRef} {...optionsCropper} />
      <CropForm
        aspect={aspect.sides}
        cropPercent={cropBoxDataPercent}
        cropPx={cropBoxDataPx}
        getCropImage={getCropImage}
        setTypeCrop={onTypeCrop}
        typeCrop={typeCropState}
        onSetAspect={calcAspectCropData}
        onSetCrop={onSetCrop}
      />
    </>
  );
};

export default Crop;
