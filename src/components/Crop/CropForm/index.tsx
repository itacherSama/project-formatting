import React, { ChangeEvent, useCallback, memo, useEffect } from 'react';
import { Button, Select, MenuItem } from '@material-ui/core';
import { ICropFormData, ICropNewData } from 'interfaces/interfaces';
import styles from '../Crop.module.css';
import { TypeCrop } from '../../../messages';
import InputsParams from './InputsParams';

type Props = {
  onSetCrop: (data: ICropNewData) => void;
  onSetAspect: (data: ICropNewData) => void;
  getCropImage: () => void;
  cropPx: ICropFormData;
  cropPercent: ICropFormData;
  aspect: ICropFormData;
  typeCrop: string;
  setTypeCrop: (data: TypeCrop) => void;
};

const CropForm = ({
  onSetCrop,
  onSetAspect,
  cropPx,
  cropPercent,
  aspect,
  typeCrop,
  getCropImage,
  setTypeCrop,
}: Props) => {
  console.log(2131312312321);
  const onChangeTypeCrop = useCallback(
    (event: ChangeEvent<any>) => {
      const newTypeCrop = event.target.value;
      setTypeCrop(newTypeCrop);
    },
    [setTypeCrop]
  );
  console.log('1232112');

  const onSetValue = useCallback(
    (data: ICropNewData): void => {
      if (typeCrop === TypeCrop.aspect) {
        onSetAspect(data);
      } else {
        onSetCrop(data);
      }
    },
    [onSetAspect, onSetCrop, typeCrop]
  );

  let crop: ICropFormData = cropPx;
  if (typeCrop === TypeCrop.percent) {
    crop = cropPercent;
  } else if (typeCrop === TypeCrop.aspect) {
    crop = aspect;
  }

  return (
    <form autoComplete="off" className={styles.cropForm} noValidate>
      <InputsParams crop={crop} onSetValue={onSetValue} />
      <Select value={typeCrop} onChange={onChangeTypeCrop}>
        {Object.values(TypeCrop).map((word: string) => (
          <MenuItem key={`${word}`} value={word}>
            {word}
          </MenuItem>
        ))}
      </Select>
      <Button color="primary" onClick={getCropImage}>
        Save
      </Button>
    </form>
  );
};

export default memo(CropForm);
