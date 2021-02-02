import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import styles from '../Crop.module.css';
import { IMyCustomCrop } from '../../../interfaces/items';
import { setTypeCrop } from '../../../effector/event';
import { calcAspect } from '../../../utils/differentFunc';


const CropForm: React.FC<any> = ({ onCropComplete, setCrop, crop, imageRef, typeCrop, typeCropWords }) => {

  const onChangeTypeCrop = (event: React.ChangeEvent<any>) => {
    const newTypeCrop = event.target.value;
    
    if (newTypeCrop === typeCropWords[2]) {
      setCrop({
          aspect: 16 / 9,
          aspectHeight: 9,
          aspectWidth: 16,
          width: 50,
        });

    } else {
      setCrop({
        unit: newTypeCrop as 'px' | '%',
        width: 50,
        height: 50,
      });

    }
    setTypeCrop(newTypeCrop);

  };

  
  const emptyField = (fieldName: string) => {
    setCrop(((prevCrop: IMyCustomCrop) => {
      return {
        ...prevCrop,
      [fieldName]: '',
      };
    }));
};

  const setCropHeight = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    if (value.length === 0) {
      emptyField('height');
      return;
    }

    const height = parseInt(value);
    if (height) {
      // const y = (imageRef!.height - height) / 2;
      const unit = typeCrop;

      setCrop({
          height,
          y: 0,
          unit
        });
    }
  };

  const setCropWidth = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    if (value.length === 0) {
      emptyField('width');
      return;
    }
    
    const width = parseInt(value);
    if (width) {
      // const x = (imageRef!.width - width) / 2;
      const unit = typeCrop;

      setCrop({
        width,
        x: 0,
        unit
      });
    }
  };

  const setCropAspectHeight = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    if (value.length === 0) {
      emptyField('aspectHeight');
      return;
    }

    const aspectHeight = parseInt(value);
    const aspect = calcAspect(crop.aspectWidth!, aspectHeight);
    if (aspect) {
      setCrop({
        aspectHeight,
        aspect
      });
    }
  };

  const setCropAspectWidth = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    if (value.length === 0) {
      emptyField('aspectWidth');
      return;
    }
    const aspectWidth = parseInt(value);
    const aspect = calcAspect(aspectWidth, crop.aspectHeight!);

    if (aspectWidth) {
      setCrop({
      aspectWidth,
      aspect
      });
    }
  };

  const handleCropComplete = (): void => {
    onCropComplete();
    setTypeCrop(typeCropWords[0]);
  }; 
  
  return (
    <form
      autoComplete='off'
      className={ styles.cropForm }
      noValidate
    >
      { typeCrop !== typeCropWords[2] && ( 
      <>
        <TextField
          label='Width'
          onChange={ setCropWidth }
          type='number'
          value={ crop.width }
        />
        <TextField
          label='Height'
          onChange={ setCropHeight }
          type='number'
          value={ crop.height }
        />
        
      </>
       ) }
      { typeCrop === typeCropWords[2] && (
        <>
          <TextField
            label='Width'
            onChange={ setCropAspectWidth }
            type='number'
            value={ crop.aspectWidth }
          />
          <TextField
            label='Height'
            onChange={ setCropAspectHeight }
            type='number'
            value={ crop.aspectHeight }
          />
          
        </>
      ) }
      <Select
        onChange={ onChangeTypeCrop }
        value={ typeCrop }
      >
        {
          typeCropWords.map((word: string, idx: number) => {

            return (
              <MenuItem
                key={ `${word}_${idx}` }
                value={ word }
              >
                { word }
              </MenuItem>
);
          })
          }
      </Select>
      <Button
        color='primary'
        onClick={ handleCropComplete }
      >
        Save
      </Button>
    </form>
  );
};

export default CropForm;