import React from 'react';
import Button from '@material-ui/core/Button';
import { useStore } from 'effector-react';
import Link from '../../router/Link';
import Dropzone from '../../components/Dropzone';
import { $images } from '../../effector/store';
import styles from './FirstPage.module.css';

const FirstPage: React.FC = () => {
  const images = useStore($images);
  const disableBtnNext = images.length === 0;
  return (
    <>
      <div className={ styles.DropzoneWrapper }>
        <Dropzone images={ images } />

      </div>
      <div className={ styles.blockButton }>

        <Button
          color='primary'
          disabled={ disableBtnNext }
          variant='contained'
        >
          <Link href='/resize'>Далее</Link>
        </Button>
      </div>

    </>
  );
};

export default FirstPage;
