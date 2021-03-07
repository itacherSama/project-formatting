import React from 'react';
import TextField from '@material-ui/core/TextField';

const WidthHeightFields:React.FC<any> = ({ crop, onSetCrop }) => {

  const [myState, setMyState] = React.useState({
    width: crop.width,
    height: crop.height
  });

  React.useEffect(() => {
    onSetCrop(myState);
  }, [myState]);

  const setCropHeight = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    const height = parseInt(value);
    if (height) {
      // const unit = typeCrop;

      setMyState((prevState) => ({
        ...prevState,
        height
      }));
    }
  };

  const setCropWidth = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = event.target;
    const width = parseInt(value);
    if (width) {
      setMyState((prevState) => ({
        ...prevState,
        width
      }));
    }
  };

  return (
    <>
      <TextField
        label='Width'
        onChange={ setCropWidth }
        type='number'
        value={ myState.width }
      />
      <TextField
        label='Height'
        onChange={ setCropHeight }
        type='number'
        value={ myState.height }
      />
    </>
  );
};

export default WidthHeightFields;
