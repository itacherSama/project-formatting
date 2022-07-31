import React, { useCallback, useEffect, useRef, useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import {
  ICropFormData,
  ICropNewData,
  IImgSettingsNaturalSize,
  IPointOnImg,
  ISettingImg,
  ICropFormDataAspect,
} from 'interfaces/interfaces';
import {
  getPositionByPoint,
  calcPxFromPercent,
  transformPxAndPercent,
  calcPercentFromPx,
  calcAspect,
} from 'services/imageService';
import CropForm from './CropForm';

type Props = {
  src: string;
  point: IPointOnImg;
  addCropedImg: (base64Img: string, settingImg: ISettingImg, dataByNaturalSize: IImgSettingsNaturalSize) => void;
  onCloseModal: () => void;
};

const Crop = ({ addCropedImg, src, onCloseModal, point }: Props) => {
  const cropperRef = useRef<HTMLImageElement>(null);
  const typeCrop = useRef('px');
  const [typeCropState, setTypeCrop] = useState('px');

  useEffect(() => {
    typeCrop.current = typeCropState;
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

  let changeActive = false;
  const getCropper = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    return cropper;
  };

  const onCrop = useCallback(() => {
    if (changeActive) {
      changeActive = false;
      return;
    }
    const cropper: any = getCropper();
    let newData = cropper.getData({ rounded: true });
    const imgSettings = cropper.getImageData();
    let error = false;

    if (point?.pointWidth) {
      try {
        newData = getPositionByPoint(newData, point, imgSettings, typeCrop.current);
      } catch (e) {
        console.log('error getPositionByPoint');
        error = true;
      }
    }
    changeActive = true;

    if (!error) {
      calcPercentCropData(newData);
      setCropDataPx(newData);
      cropper.setData(newData);
    } else {
      cropper.setData({ ...cropDataPx });
    }
  }, [point, typeCropState]);

  const onSetCrop = (newValue: ICropNewData) => {
    const cropper: any = getCropper();
    const currenValues = cropper.getData({ rounded: true });
    const imgSettings = cropper.getImageData();
    let error = false;
    let newValuesCrop = null;
    let valueByPoint = null;

    if (typeCrop.current === '%') {
      const transformNewValue = transformPxAndPercent(cropperRef.current!, newValue, calcPxFromPercent);
      newValuesCrop = { ...currenValues, ...transformNewValue };
    } else {
      newValuesCrop = { ...currenValues, ...newValue };
    }

    if (point?.pointWidth) {
      try {
        valueByPoint = getPositionByPoint(newValuesCrop, point, imgSettings, typeCrop.current);
      } catch (e) {
        console.log('error getPositionByPoint');
        error = true;
      }
    }

    if (!error) {
      cropper.setData(valueByPoint || newValuesCrop);
    } else {
      cropper.setData({ ...cropDataPx });
    }
  };

  const transformDataByPointCrop = () => {
    if (point?.pointWidth) {
      const cropper: any = getCropper();
      const imgSettings = cropper.getImageData();
      const cropperData = cropper.getData({ rounded: true });

      if (point?.pointWidth) {
        try {
          const getData = getPositionByPoint(cropperData, point, imgSettings, typeCrop.current);
          cropper.crop();
          cropper.setData({ ...getData });
        } catch (e) {
          console.log('error getPositionByPoint');
        }
      }
    }
  };

  const getCropImage = () => {
    const cropper: any = getCropper();
    const cropperData = cropper.getData({ rounded: true });
    const imgSettings = cropper.getImageData();

    const dataByImg: ISettingImg = {
      x: cropperData.x,
      y: cropperData.y,
      width: cropperData.width,
      height: cropperData.height,
    };

    const base64Img = cropper.getCroppedCanvas().toDataURL();

    addCropedImg(base64Img, dataByImg, imgSettings);
    onCloseModal();
  };

  useEffect(() => {
    const cropper: any = getCropper();
    const natutalSize = cropper.getImageData();

    if (typeCrop.current === 'aspect') {
      cropper
        .setAspectRatio(aspect.value)
        .setData({ width: natutalSize.naturalWidth, height: natutalSize.naturalHeight });
    }
  }, [typeCropState, aspect]);

  useEffect(() => {
    setTypeCrop('px');
  }, []);

  const onTypeCrop = (newType: string): void => {
    if (typeCrop.current === 'aspect' && newType !== 'aspect') {
      const cropper: any = getCropper();
      cropper.setAspectRatio(NaN).setData({ ...cropDataPx });
    }
    setTypeCrop(newType);
  };

  return (
    <>
      <Cropper
        ref={cropperRef}
        autoCropArea={0.5}
        background={false}
        crop={onCrop}
        guides={false}
        ready={() => {
          transformDataByPointCrop();
        }}
        src={src}
        viewMode={1}
        zoomable={false}
        autoCrop
        responsive
      />
      <CropForm
        aspect={aspect.sides}
        cropPercent={cropDataPercent}
        cropPx={cropDataPx}
        getCropImage={getCropImage}
        setTypeCrop={onTypeCrop}
        typeCrop={typeCrop.current}
        onSetAspect={calcAspectCropData}
        onSetCrop={onSetCrop}
      />
    </>
  );
};

export default Crop;
