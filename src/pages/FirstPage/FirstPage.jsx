import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useStore } from 'effector-react';
import Dropzone from '../../components/Dropzone';
import { $images } from '../../effector';

function FirstPage() {
  const images = useStore($images);
  const disableBtnNext = !images.length;
  return (
    <>
      <div className='DropzoneWrapper'>
        <Dropzone images={ images } />

      </div>
      <div className='blockButton'>

        <Button
          color='primary' disabled={ disableBtnNext }
          variant='contained'
        >
          <Link to='/resize'>Далее</Link>
        </Button>
      </div>

    </>
  );
}

export default FirstPage;