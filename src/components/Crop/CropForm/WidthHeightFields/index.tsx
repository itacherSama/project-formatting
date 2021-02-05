import React from 'react';
import TextField from '@material-ui/core/TextField';

const WidthHeightFields:React.FC<any> = ({ crop, onSetCrop }) => {
  const setCropHeight = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    // if (value.length === 0) {
    //   emptyField('height');
    //   return;
    // }

    const height = parseInt(value);
    if (height) {
      // const unit = typeCrop;

      onSetCrop({
          height
        });
    }
  };

  const setCropWidth = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    const width = parseInt(value);
    if (width) {
      onSetCrop({
        width
      });
    }
  };

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
