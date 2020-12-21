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
        <Link to='/resize'>
          <Button
            color='primary' disabled={ disableBtnNext }
            variant='contained'
          >Далее</Button>
        </Link>
      </div>

    </>
  );
}

export default FirstPage;
