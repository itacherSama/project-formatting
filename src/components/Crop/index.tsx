/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FC, useEffect, useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import { useStore } from 'effector-react';
import { setCropDataPx, setAspect, setCropperRef, setTypeCrop } from 'effector/event';
import { ICropNewData } from 'interfaces/items';
import CropForm from './CropForm';
import { $aspect, $cropDataPercent, $cropDataPx, $typeCrop } from '../../effector/store';
import { ICrop } from '../../interfaces/components';
import { getPositionByPoint, calcPxFromPercent, transformPxAndPercent } from '../../services/imageService';

const typeCropWords = ['px', '%', 'aspect'];

const Crop: FC<ICrop> = ({ addCropedImg, src, onCloseModal, point }) => {
  const typeCrop = useStore($typeCrop);
  const cropperRef = useRef<HTMLImageElement>(null);
  const cropDataPx = useStore($cropDataPx);
  const cropDataPercent = useStore($cropDataPercent);
  const aspect = useStore($aspect);

  const getCropper = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;

    return cropper;
  };

  useEffect(() => {
    setCropperRef(cropperRef);
  }, [cropperRef]);

  const onCrop = () => {
    const cropper: any = getCropper();
    const newData = cropper.getData({ rounded: true });

    setCropDataPx(newData);
  };

  const onSetCrop = (newValue: ICropNewData) => {
    const cropper: any = getCropper();
    const currenValues = cropper.getData({ rounded: true });
    const imgSettings = cropper.getImageData();
    console.log('newValue', newValue);

    let newValuesCrop = null;
    let valueByPoint = null;

    if (typeCrop === '%') {
      const transformNewValue = transformPxAndPercent(cropperRef.current!, newValue, calcPxFromPercent);
      newValuesCrop = { ...currenValues, ...transformNewValue };
    } else {
      newValuesCrop = { ...currenValues, ...newValue };
    }

    if (point.pointWidth) {
      valueByPoint = getPositionByPoint(newValuesCrop, point, imgSettings);
    }

    cropper.setData(valueByPoint || newValuesCrop);
  };

  const transformDataByPointCrop = () => {
    if (point) {
      const cropper: any = getCropper();
      const imgSettings = cropper.getImageData();
      const cropperData = cropper.getData({ rounded: true });
      const getData = getPositionByPoint(cropperData, point, imgSettings);

      cropper.crop();
      cropper.setData({ ...getData });
    }
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

  useEffect(() => {
    const cropper: any = getCropper();
    if (typeCrop === 'aspect') {
      cropper.setAspectRatio(aspect.value);
    }
  }, [aspect, typeCrop]);

  const cancelMyAspect = (): void => {
    const cropper: any = getCropper();
    cropper.setAspectRatio(NaN);
  };

  const onTypeCrop = (newType: string): void => {
    if (typeCrop === 'aspect') {
      cancelMyAspect();
    }
    setTypeCrop(newType);
  };

  return (
    <>
      <Cropper
        ref={cropperRef}
        autoCrop={false}
        autoCropArea={1}
        background={false}
        crop={onCrop}
        guides={false}
        ready={() => {
          transformDataByPointCrop();
        }}
        src={src}
        viewMode={1}
        zoomable={false}
        responsive
      />
      <CropForm
        aspect={aspect.sides}
        cropPercent={cropDataPercent}
        cropPx={cropDataPx}
        getCropImage={getCropImage}
        setTypeCrop={onTypeCrop}
        typeCrop={typeCrop}
        typeCropWords={typeCropWords}
        onSetAspect={setAspect}
        onSetCrop={onSetCrop}
      />
    </>
  );
};

export default Crop;
