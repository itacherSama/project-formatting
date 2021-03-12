import React from 'react';
import Button from '@material-ui/core/Button'; 
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import styles from '../Crop.module.css'; 
import { setTypeCrop } from '../../../effector/event';
import WidthHeightFields from './WidthHeightFields';
import WidthHeightAspectFields from './WidthHeightAspectFields';

import { ICropForm } from '../../../interfaces/components';

const CropForm: React.FC<ICropForm> = ({ onSetCrop, crop, aspect, onSetAspect, typeCrop, typeCropWords, getCropImage }) => {

  const onChangeTypeCrop = (event: React.ChangeEvent<any>) => {
    const newTypeCrop = event.target.value;
    setTypeCrop(newTypeCrop);
  };
  
  return (
    <form
      autoComplete='off'
      className={ styles.cropForm }
      noValidate
    >
      { typeCrop !== typeCropWords[2] ? (
        <WidthHeightFields
          crop={ crop }
          onSetCrop={ onSetCrop }
        />
      ) : (
        <WidthHeightAspectFields
          aspect={ aspect }
          onSetAspect={ onSetAspect }
        />
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
        onClick={ getCropImage }
      >
        Save
      </Button>
    </form>
  );
};

export default CropForm;