import React, { ChangeEvent, useCallback } from 'react';
import { Button, Select, MenuItem, TextField } from '@material-ui/core';
import { ICropFormData, ICropNewData } from '@interfaces/interfaces';
import messages from '@messages/index.json';
import styles from '../Crop.module.css';

const CropForm: React.FC<{
  onSetCrop: (data: ICropNewData) => void;
  onSetAspect: (data: ICropNewData) => void;
  getCropImage: () => void;
  cropPx: ICropFormData;
  cropPercent: ICropFormData;
  aspect: ICropFormData;
  typeCrop: string;
  setTypeCrop: (data: string) => void;
}> = ({ onSetCrop, onSetAspect, cropPx, cropPercent, aspect, typeCrop, getCropImage, setTypeCrop }) => {
  const onChangeTypeCrop = useCallback(
    (event: React.ChangeEvent<any>) => {
      const newTypeCrop = event.target.value;
      setTypeCrop(newTypeCrop);
    },
    [setTypeCrop]
  );

  const onSetValue = useCallback(
    ({ target }: ChangeEvent<HTMLTextAreaElement>): void => {
      const { name, value } = target;
      const newValue = { [name]: parseInt(value, 10) };
      if (typeCrop === 'aspect') {
        onSetAspect(newValue);
        return;
      }

      onSetCrop(newValue);
    },
    [onSetAspect, onSetCrop, typeCrop]
  );

  const generateInputs = useCallback(() => {
    let crop: ICropFormData = cropPx;
    if (typeCrop === '%') {
      crop = cropPercent;
    } else if (typeCrop === 'aspect') {
      crop = aspect;
    }

    return (
      <>
        <TextField label="Width" name="width" type="number" value={crop.width} onChange={onSetValue} />
        <TextField label="Height" name="height" type="number" value={crop.height} onChange={onSetValue} />
      </>
    );
  }, [typeCrop, cropPx, cropPercent, aspect, onSetValue]);

  return (
    <form autoComplete="off" className={styles.cropForm} noValidate>
      {generateInputs()}
      <Select value={typeCrop} onChange={onChangeTypeCrop}>
        {messages.typeCropWords.map((word: string) => (
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

export default CropForm;
