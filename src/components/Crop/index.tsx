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
  const cropperServiceRef = useRef(new CropService({ cropperRef, typeCropRef, changeActiveRef }));
  const cropperService = cropperServiceRef.current;

  useEffect(() => {
    typeCropRef.current = typeCropState;
  }, [typeCropState]);

  const [cropDataPx, setCropDataPx] = useState<ICropFormData>({
    width: 200,
    height: 200,
  });

  const [cropDataPercent, setCropDataPercent] = useState<ICropFormData>({ width: 50, height: 50 });

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
    const cropper = cropperService.getCropper();

    if (cropper && setting) {
      const imgSettings = cropper.getImageData();
      const transformed = transformSettingInPx(setting, imgSettings);
      console.log('transformed', transformed);
      setCropDataPx(transformed);
      cropper.setData(transformed as any);
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

  const calcAspectCropData = (newValue: any) => {
    setCropAspect((prevState) => {
      const newValues = { ...prevState.sides, ...newValue };

      return { sides: newValues, value: calcAspect(newValues), used: true };
    });
  };

  const onCrop = useCallback(() => {
    const newValues = cropperService.onCrop(point, cropDataPx);
    if (newValues) {
      calcPercentCropData(newValues);
      setCropDataPx(newValues);
    }
  }, [point, cropDataPx]);

  const onSetCrop = (newValue: ICropNewData) => {
    cropperService.onSetCrop(point, newValue, cropDataPx);
  };

  const getCropImage = () => {
    cropperService.getCropImage(addCropedImg);
    onCloseModal();
  };

  const onTypeCrop = (newType: TypeCrop): void => {
    cropperService.onTypeCrop(newType, cropDataPx);
    setTypeCrop(newType);
  };

  console.log('cropReady', cropReady);
  if (!cropReady) {
    return <div>loading</div>;
  }

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
      console.log(123123);
      cropperService.transformDataByPointCrop(point);
    },
  });

  return (
    <>
      <Cropper ref={cropperRef} {...optionsCropper} />
      <CropForm
        aspect={aspect.sides}
        cropPercent={cropDataPercent}
        cropPx={cropDataPx}
        getCropImage={getCropImage}
        setTypeCrop={onTypeCrop}
        typeCrop={typeCropState}
        onSetAspect={calcAspectCropData}
        onSetCrop={onSetCrop}
      />
    </>
  );
};

export default memo(Crop);
