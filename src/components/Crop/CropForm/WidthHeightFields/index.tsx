import React, { FC, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';

const WidthHeightFields:FC<any> = ({ crop, onSetCrop }) => {

  const setCropHeight = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    onSetCrop({ type: 'height', value });
  };

  const setCropWidth = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    onSetCrop({ type: 'width', value });
  };

  if (!crop) return <div />;

  return (
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
  );
};

export default WidthHeightFields;
