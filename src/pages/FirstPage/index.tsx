import React from 'react';
import Button from '@material-ui/core/Button';
import { useStore } from 'effector-react';
import Link from '../../router/Link';
import Dropzone from '../../components/Dropzone';
import { cancelImg } from '../../effector/event';
import { $images } from '../../effector/store';
import styles from './FirstPage.module.css';

import { IobjImg } from '../../interfaces/items';

const FirstPage: React.FC = () => {
  const images: IobjImg[] = useStore($images);
  const disableBtnNext: boolean = images.length === 0;
  return (
    <>
      <div className={ styles.DropzoneWrapper }>
        <Dropzone
          cancelImg={ cancelImg }
          images={ images }
        />

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
