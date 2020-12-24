import React from 'react';
import { useStore } from 'effector-react';
import Button from '@material-ui/core/Button';
import { $currentImage, setCurrentImage, $images } from '../../effector';
import BlockImg from '../../components/BlockImg';
import Gallery from '../../components/Gallery';

const ResizePage = () => {
  const image = useStore($currentImage);
  const images = useStore($images);

  return (
    <>
      <div>
        ResizePage
      </div>
      {!!image && <BlockImg file={ image } isImgSolo />}

      <div className="kitImages">
        {images.length
        && <Gallery files={ images } />
      }
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
