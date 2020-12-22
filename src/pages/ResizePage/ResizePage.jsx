import React from 'react';
import { useStore } from 'effector-react';
import Button from '@material-ui/core/Button';
import { $currentImage, setCurrentImage } from '../../effector';
import BlockImg from '../../components/BlockImg';

const ResizePage = () => {
  const image = useStore($currentImage);

  return (
    <>
      <div>
        ResizePage
      </div>
      {!!image && <BlockImg file={ image } isImgSolo />}

      <div className="kitImages">
        много картинок
      </div>

      <Button
        color='primary'
        variant='contained'
      >Далее
      </Button>
    </>
  );
};

export default ResizePage;
