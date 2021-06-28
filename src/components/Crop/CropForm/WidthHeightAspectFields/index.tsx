import React from 'react';
import TextField from '@material-ui/core/TextField';

const WidthHeightAspectFields: React.FC<any> = ({ onSetAspect, aspect }) => {
  const onChangeAspectWidth = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    const width = value;
    onSetAspect((prevState: any) => {
      return {
        ...prevState,
        width,
      };
    });
  };

  const onChangeAspectHeight = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    const height = value;
    onSetAspect((prevState: any) => {
      return {
        ...prevState,
        height,
      };
    });
  };

  return (
    <>
      <TextField label="Width" onChange={onChangeAspectWidth} type="number" value={aspect.width} />
      <TextField label="Height" onChange={onChangeAspectHeight} type="number" value={aspect.height} />
    </>
  );
};

export default WidthHeightAspectFields;
